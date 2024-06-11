package controller

import (
	"mime/multipart"
	"net/http"
	"time"
	"youtube-clone/common/dtos"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/auth/service"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/utils"

	"github.com/labstack/echo/v4"
)

type IAuthController interface {
	RegisterRoutes(e *echo.Echo)
	login(c echo.Context) error
	logout(c echo.Context) error
	register(c echo.Context) error
}

type AuthController struct {
	authService service.IAuthService
}

type ResponseUser struct {
	UserName         string `json:"user_name"`
	FullName         string `json:"full_name"`
	ProfileImageName string `json:"profile_image_name"`
	StatusCode       string `json:"status"`
	Message          string `json:"message"`
}

func NewAuthController(authService service.IAuthService) IAuthController {
	return &AuthController{
		authService: authService,
	}
}

func (a *AuthController) RegisterRoutes(e *echo.Echo) {
	e.POST("/login", a.login)
	e.POST("/logout", a.logout)
	e.POST("/register", a.register)
}

func (a *AuthController) register(c echo.Context) error {
	profileImageName := ""
	var profileImageErr error
	var profileImageFile *multipart.FileHeader

	profileImageFile, profileImageErr = c.FormFile("profile_image_file")

	if profileImageFile != nil {
		if profileImageErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Error retrieving the file", StatusCode: "400"})
		}

		profileImageName, profileImageErr = utils.UploadImage(*profileImageFile, true)

		if profileImageErr != nil {
			return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: profileImageErr.Error(), StatusCode: "400"})
		}
	}

	createUserDto := dto.CreateUserDto{
		FullName:         c.FormValue("full_name"),
		UserName:         c.FormValue("user_name"),
		Password:         c.FormValue("password"),
		ProfileImageName: profileImageName,
	}

	user := a.authService.CreateUser(createUserDto)

	token, _ := jwt.CreateJwt(user.UserName, user.Id)
	cookie := new(http.Cookie)
	cookie.Name = "authorization"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	cookie.Path = "/"

	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, ResponseUser{UserName: user.UserName, FullName: user.FullName, ProfileImageName: user.ProfileImageName, StatusCode: "200", Message: ""})
}

func (a *AuthController) login(c echo.Context) error {
	loginUserDto := dto.LoginUserDto{
		UserName: c.FormValue("user_name"),
		Password: c.FormValue("password"),
	}

	user, loggedIn := a.authService.Login(loginUserDto)

	if !loggedIn {
		return c.JSON(http.StatusNotFound, dtos.ResponseMessage{Message: "User not found!", StatusCode: "404"})
	}

	token, _ := jwt.CreateJwt(user.UserName, user.Id)

	cookie := new(http.Cookie)
	cookie.Name = "authorization"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	cookie.Path = "/"

	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, ResponseUser{UserName: user.UserName, FullName: user.FullName, ProfileImageName: user.ProfileImageName, StatusCode: "200", Message: ""})
}

func (a *AuthController) logout(c echo.Context) error {
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
