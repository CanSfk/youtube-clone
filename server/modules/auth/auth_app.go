package auth

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/auth/controller"
	"youtube-clone/modules/user/repository"
	"youtube-clone/modules/user/service"
)

func CreateAuthApp(db *sql.DB) controller.IAuthController {
	baseCrudRepository := repositories.NewBaseCrudRepository(db, "Users")
	userRepository := repository.NewUserRepository(baseCrudRepository)
	userService := service.NewUserService(userRepository)

	authController := controller.NewAuthController(userService)

	return authController
}
