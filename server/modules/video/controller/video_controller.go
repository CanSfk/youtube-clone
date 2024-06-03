package controller

import (
	"mime/multipart"
	"net/http"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/service"
	"youtube-clone/utils"

	"github.com/labstack/echo/v4"
)

type responseMessage struct {
	Message    string `json:"message"`
	StatusCode string `json:"status"`
}

type IVideoController interface {
	RegisterRoutes(e *echo.Echo)
	index(c echo.Context) error
	create(c echo.Context) error
}

type videoController struct {
	videoService service.IVideoService
}

func NewVideoController(videoService service.IVideoService) IVideoController {
	return &videoController{
		videoService: videoService,
	}
}

func (v *videoController) RegisterRoutes(e *echo.Echo) {
	routeGroup := e.Group("video", jwt.JWTMiddleware)

	routeGroup.GET("/list", v.index, jwt.JWTMiddleware)
	routeGroup.POST("/create", v.create)
}

func (v *videoController) index(c echo.Context) error {
	return c.JSON(http.StatusOK, v.videoService.GetAllVideos())
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
			return c.JSON(http.StatusBadRequest, responseMessage{Message: "Error retrieving the file", StatusCode: "400"})
		}

		videoName, videoFileErr = utils.UploadVideo(*videoFile)

		if videoFileErr != nil {
			return c.JSON(http.StatusBadRequest, responseMessage{Message: videoFileErr.Error(), StatusCode: "400"})
		}
	}

	if coverImage != nil {
		if coverImageErr != nil {
			return c.JSON(http.StatusBadRequest, responseMessage{Message: "Error retrieving the file", StatusCode: "400"})
		}

		coverImageName, coverImageErr = utils.UploadImage(*coverImage, true)

		if coverImageErr != nil {
			return c.JSON(http.StatusBadRequest, responseMessage{Message: coverImageErr.Error(), StatusCode: "400"})
		}
	}

	videoCreateDto := dto.VideoCreateDto{
		VideoUrl:            videoName,
		VideoCoverImageName: coverImageName,
		VideoTitle:          c.FormValue("video_title"),
		VideoDescription:    c.FormValue("video_description"),
		UserId:              1,
	}

	v.videoService.CreateVideo(videoCreateDto)

	return c.JSON(http.StatusOK, responseMessage{Message: "Video created successful", StatusCode: "200"})
}
