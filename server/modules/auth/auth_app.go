package auth

import (
	"database/sql"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/auth/controller"
	"youtube-clone/modules/auth/service"
	"youtube-clone/modules/user/repository"
)

func CreateAuthApp(db *sql.DB) controller.IAuthController {
	baseCrudRepository := repositories.NewBaseCrudRepository(db, "users")
	userRepository := repository.NewUserRepository(baseCrudRepository)
	userService := service.NewAuthService(userRepository)

	authController := controller.NewAuthController(userService)

	return authController
}
