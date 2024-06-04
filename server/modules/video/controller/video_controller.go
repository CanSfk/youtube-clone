package controller

import (
	"mime/multipart"
	"net/http"
	"youtube-clone/common/dtos"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/service"
	"youtube-clone/utils"

	"github.com/labstack/echo/v4"
)

type IVideoController interface {
	RegisterRoutes(e *echo.Echo)
	index(c echo.Context) error
	create(c echo.Context) error
	show(c echo.Context) error
}

type videoController struct {
	videoService        service.IVideoService
	videoCommentService service.IVideoCommentService
}

type ReponseMessageAndVideo struct {
	Video   dto.VideoWithUserResponseDto `json:"video"`
	Message dtos.ResponseMessage         `json:"message"`
}

func NewVideoController(videoService service.IVideoService, videoCommentService service.IVideoCommentService) IVideoController {
	return &videoController{
		videoService:        videoService,
		videoCommentService: videoCommentService,
	}
}

func (v *videoController) RegisterRoutes(e *echo.Echo) {
	routeGroup := e.Group("video", jwt.JWTMiddleware)

	routeGroup.GET("/list", v.index)
	routeGroup.POST("/create", v.create)
	routeGroup.GET("/show/:vName", v.show)
}

func (v *videoController) index(c echo.Context) error {
	return c.JSON(http.StatusOK, v.videoService.GetAllVideosWithUser())
}

func (v *videoController) create(c echo.Context) error {
	videoName := ""
	coverImageName := ""
	var videoFileErr error
	var coverImageErr error
	var videoFile *multipart.FileHeader
	var coverImage *multipart.FileHeader

	videoFile, videoFileErr = c.FormFile("video_file")
	coverImage, coverImageErr = c.FormFile("image_file")

	if videoFile != nil {
		if videoFileErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Error retrieving the file", StatusCode: "400"})
		}

		videoName, videoFileErr = utils.UploadVideo(*videoFile)

		if videoFileErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: videoFileErr.Error(), StatusCode: "400"})
		}
	}

	if coverImage != nil {
		if coverImageErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Error retrieving the file", StatusCode: "400"})
		}

		coverImageName, coverImageErr = utils.UploadImage(*coverImage, true)

		if coverImageErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: coverImageErr.Error(), StatusCode: "400"})
		}
	}

	videoCreateDto := dto.VideoCreateDto{
		VideoUrl:            videoName,
		VideoCoverImageName: coverImageName,
		VideoTitle:          c.FormValue("video_title"),
		VideoDescription:    c.FormValue("video_description"),
		UserId:              1,
	}

	video := v.videoService.CreateVideo(videoCreateDto)

	response := ReponseMessageAndVideo{
		Video: video,
		Message: dtos.ResponseMessage{
			Message:    "Video created succesfuly",
			StatusCode: "200",
		},
	}

	return c.JSON(http.StatusOK, response)
}

func (v *videoController) show(c echo.Context) error {
	videoName := c.Param("vName")
	video := v.videoService.GetVideoByName(videoName)

	return c.JSON(http.StatusOK, video)
}
