package video

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/controller"
	"youtube-clone/modules/video/repository"
	"youtube-clone/modules/video/service"
)

func CreateVideoApp(db *sql.DB) controller.IVideoController {
	baseCrudRepositoryVideo := repositories.NewBaseCrudRepository(db, "Videos")
	videoRepository := repository.NewVideoRepository(baseCrudRepositoryVideo)
	videoService := service.NewVideoService(videoRepository)

	baseCrudRepositoryVideoComment := repositories.NewBaseCrudRepository(db, "VideoComments")
	videoCommentRepository := repository.NewVideoCommentRepository(baseCrudRepositoryVideoComment)
	videoCommentService := service.NewVideoCommentService(videoCommentRepository)
	videoController := controller.NewVideoController(videoService, videoCommentService)

	return videoController
}
