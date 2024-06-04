package controller

import (
	"fmt"
	"net/http"
	"time"
	"youtube-clone/common/dtos"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/service"

	"github.com/labstack/echo/v4"
)

type IAuthController interface {
	RegisterRoutes(e *echo.Echo)
	login(c echo.Context) error
	logout(c echo.Context) error
	register(c echo.Context) error
}

type AuthController struct {
	userService service.IUserService
}

type ResponseUser struct {
	UserName   string `json:"user_name"`
	StatusCode string `json:"status"`
	Message    string `json:"message"`
}

func NewAuthController(userService service.IUserService) IAuthController {
	return &AuthController{
		userService: userService,
	}
}

func (a *AuthController) RegisterRoutes(e *echo.Echo) {
	e.POST("/login", a.login)
	e.POST("/logout", a.logout)
}

func (a *AuthController) register(c echo.Context) error {
	createUserDto := dto.CreateUserDto{}

	if err := c.Bind(&createUserDto); err != nil {
		return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Bad request"})
	}

	a.userService.CreateUser(createUserDto)

	return c.JSON(http.StatusOK, dtos.ResponseMessage{Message: "Created user successful", StatusCode: "200"})
}

func (a *AuthController) login(c echo.Context) error {
	loginUserDto := dto.LoginUserDto{
		UserName: c.FormValue("user_name"),
		Password: c.FormValue("password"),
	}

	loggedIn := a.userService.LoginUser(loginUserDto)

	if !loggedIn {
		return c.JSON(http.StatusNotFound, dtos.ResponseMessage{Message: "User not found!", StatusCode: "404"})
	}

	token, _ := jwt.CreateJwt(loginUserDto.UserName)

	cookie := new(http.Cookie)
	cookie.Name = "authorization"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	cookie.Path = "/"

	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, ResponseUser{UserName: loginUserDto.UserName, StatusCode: "200", Message: ""})
}

func (a *AuthController) logout(c echo.Context) error {
	fmt.Println("LOG")
	cookie := &http.Cookie{
		Name:     "authorization",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		MaxAge:   -1,
		HttpOnly: true,
	}

	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, dtos.ResponseMessage{Message: "Logout successful", StatusCode: "200"})
}
