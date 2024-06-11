package user

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/controller"
	"youtube-clone/modules/user/repository"
	"youtube-clone/modules/user/service"
)

func CreateUserApp(db *sql.DB) controller.IUserController {
	userRepository := repository.NewUserRepository(repositories.NewBaseCrudRepository(db, "users"))
	userService := service.NewUserService(userRepository)

	userSubscriberRepository := repository.NewUserSubscriberRepository(repositories.NewBaseCrudRepository(db, "user_subscribers"))
	userSubscriberService := service.NewUserSubscriberService(userSubscriberRepository)

	userVideoHistoryRepository := repository.NewUserVideoHistoryRepository(repositories.NewBaseCrudRepository(db, "user_video_histories"))
	userVideoHistoryService := service.NewUserVideoHistoryService(userVideoHistoryRepository)

	userController := controller.NewUserController(userService, userSubscriberService, userVideoHistoryService)

	return userController
}
