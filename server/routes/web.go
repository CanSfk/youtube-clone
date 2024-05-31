package routes

import (
	"database/sql"
	"youtube-clone/modules/user"
	"youtube-clone/modules/video"

	"github.com/labstack/echo/v4"
)

type WebRoutes struct {
}

func NewWebRoutes() *WebRoutes {
	return &WebRoutes{}
}

func (w *WebRoutes) Routes(e *echo.Echo, db *sql.DB) {
	userController := user.CreateUserApp(db)
	videoController := video.CreateVideoApp(db)

	userController.RegisterRoutes(e)
	videoController.RegisterRoutes(e)
}
