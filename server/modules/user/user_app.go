package user

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/controller"
	"youtube-clone/modules/user/repository"
	"youtube-clone/modules/user/service"
)

func CreateUserApp(db *sql.DB) controller.IUserController {
	baseCrudRepository := repositories.NewBaseCrudRepository(db, "Users")
	userRepository := repository.NewUserRepository(baseCrudRepository)
	userService := service.NewUserService(userRepository)

	userController := controller.NewUserController(userService)

	return userController
}
