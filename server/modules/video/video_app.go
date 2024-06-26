package video

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/controller"
	"youtube-clone/modules/video/repository"
	"youtube-clone/modules/video/service"
)

func CreateVideoApp(db *sql.DB) controller.IVideoController {
	baseCrudRepositoryVideo := repositories.NewBaseCrudRepository(db, "videos")
	videoRepository := repository.NewVideoRepository(baseCrudRepositoryVideo)
	videoService := service.NewVideoService(videoRepository)

	baseCrudRepositoryVideoComment := repositories.NewBaseCrudRepository(db, "video_comments")
	videoCommentRepository := repository.NewVideoCommentRepository(baseCrudRepositoryVideoComment)
	videoCommentService := service.NewVideoCommentService(videoCommentRepository)

	baseCrudRepositoryVideoLike := repositories.NewBaseCrudRepository(db, "video_likes")
	videoLikesRepository := repository.NewVideoLikeRepository(baseCrudRepositoryVideoLike)
	videoLikesService := service.NewVideoLikeService(videoLikesRepository)

	videoController := controller.NewVideoController(videoService, videoCommentService, videoLikesService)

	return videoController
}
