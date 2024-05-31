package controller

import (
	"fmt"
	"net/http"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/service"

	"github.com/labstack/echo/v4"
)

type responseMessage struct {
	Message string
}

type IUserController interface {
	RegisterRoutes(e *echo.Echo)
	index(c echo.Context) error
	create(c echo.Context) error
}

type UserController struct {
	userService service.IUserService
}

func NewUserController(userService service.IUserService) IUserController {
	return &UserController{
		userService: userService,
	}
}

func (u *UserController) RegisterRoutes(e *echo.Echo) {
	e.GET("/users", u.index)
	e.POST("/user/create", u.create)
}

func (u *UserController) index(c echo.Context) error {
	users := u.userService.GetAllUsers()

	return c.JSON(http.StatusOK, users)
}

func (u *UserController) create(c echo.Context) error {
	message := responseMessage{}
	createUserDto := dto.CreateUserDto{}

	if err := c.Bind(&createUserDto); err != nil {
		message.Message = fmt.Sprintf("Bad Request: %s", err)

		return c.JSON(http.StatusBadRequest, message)
	}

	u.userService.CreateUser(createUserDto)

	return c.JSON(http.StatusOK, message)
}
