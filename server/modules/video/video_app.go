package video

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/controller"
	"youtube-clone/modules/video/repository"
	"youtube-clone/modules/video/service"
)

func CreateVideoApp(db *sql.DB) controller.IVideoController {
	baseCrudRepository := repositories.NewBaseCrudRepository(db, "Videos")
	videoRepository := repository.NewVideoRepository(baseCrudRepository)
	videoService := service.NewVideoService(videoRepository)
	videoController := controller.NewVideoController(videoService)

	return videoController
}
