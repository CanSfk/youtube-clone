package controller

import (
	"net/http"
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/service"

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
	e.GET("/videos", v.index)
	e.POST("/video/create", v.create)
}

func (v *videoController) index(c echo.Context) error {
	return c.JSON(http.StatusOK, v.videoService.GetAllVideos())
}

func (v *videoController) create(c echo.Context) error {
	videoCreateDto := dto.VideoCreateDto{}

	err := c.Bind(&videoCreateDto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, responseMessage{Message: "Bad Request", StatusCode: "400"})
	}

	v.videoService.CreateVideo(videoCreateDto)

	return c.JSON(http.StatusOK, responseMessage{Message: "Video created successful", StatusCode: "200"})
}
