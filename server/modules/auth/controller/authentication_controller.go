package controller

import (
	"net/http"
	"time"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/service"

	"github.com/labstack/echo/v4"
)

type responseMessage struct {
	Message    string `json:"message"`
	StatusCode string `json:"status"`
}

type IAuthController interface {
	RegisterRoutes(e *echo.Echo)
	login(c echo.Context) error
}

type AuthController struct {
	userService service.IUserService
}

func NewAuthController(userService service.IUserService) IAuthController {
	return &AuthController{
		userService: userService,
	}
}

func (a *AuthController) RegisterRoutes(e *echo.Echo) {
	e.POST("/login", a.login)
}

func (a *AuthController) login(c echo.Context) error {
	var loginUserDto dto.LoginUserDto
	if err := c.Bind(&loginUserDto); err != nil {
		return c.JSON(http.StatusNotFound, responseMessage{Message: "Bad request", StatusCode: "400"})
	}

	loggedIn := a.userService.LoginUser(loginUserDto)

	if !loggedIn {
		return c.JSON(http.StatusNotFound, responseMessage{Message: "User not found!", StatusCode: "404"})
	}

	token, _ := jwt.CreateJwt(loginUserDto.UserName)

	cookie := new(http.Cookie)
	cookie.Name = "authorization"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	cookie.Path = "/"

	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, responseMessage{Message: "Login process successful. Token: ", StatusCode: "200"})
}
