package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"youtube-clone/common/dtos"
	"youtube-clone/modules/user/service"

	"github.com/labstack/echo/v4"
)

type IUserController interface {
	RegisterRoutes(e *echo.Echo)
	index(c echo.Context) error
	show(c echo.Context) error
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
	e.GET("/users/:id", u.show)
}

func (u *UserController) index(c echo.Context) error {
	users := u.userService.GetAllUsersWithVideos()

	return c.JSON(http.StatusOK, users)
}

func (u *UserController) show(c echo.Context) error {
	id := c.Param("id")

	parseIntId, err := strconv.Atoi(id)

	if err != nil {
		fmt.Printf("Conversion error: %s", err)
	}

	user, err := u.userService.GetUserById(parseIntId)

	if err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, dtos.ResponseMessage{Message: "User not found!", StatusCode: "404"})
		} else {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Unexpected error!", StatusCode: "500"})
		}
	}

	return c.JSON(http.StatusOK, user)
}
