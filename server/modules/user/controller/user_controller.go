package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"youtube-clone/common/dtos"
	"youtube-clone/modules/auth/jwt"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/service"

	"github.com/labstack/echo/v4"
)

type IUserController interface {
	RegisterRoutes(e *echo.Echo)
	index(c echo.Context) error
	show(c echo.Context) error
}

type UserController struct {
	userService             service.IUserService
	userSubscriberService   service.IUserSubscriberService
	userVideoHistoryService service.IUserVideoHistoryService
}

func NewUserController(userService service.IUserService,
	userSubscriberService service.IUserSubscriberService,
	userVideoHistoryService service.IUserVideoHistoryService) IUserController {
	return &UserController{
		userService:             userService,
		userSubscriberService:   userSubscriberService,
		userVideoHistoryService: userVideoHistoryService,
	}
}

func (u *UserController) RegisterRoutes(e *echo.Echo) {
	routeGroup := e.Group("user", jwt.JWTMiddleware)

	routeGroup.GET("", u.index)
	routeGroup.GET("/:id", u.show)
	routeGroup.POST("/subscriber", u.createSubscriber)
	routeGroup.POST("/getsubscriber", u.subscriber)
	routeGroup.POST("/history/:vName", u.history)
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

func (u *UserController) subscriber(c echo.Context) error {
	userSubscriberId, _ := strconv.Atoi(c.FormValue("user_subscriber_id"))

	createSubscriberDto := dto.CreateSubscriberDto{
		UserId:           c.Get("user_id").(int),
		UserSubscriberId: userSubscriberId,
	}

	result := u.userSubscriberService.GetSubscriber(createSubscriberDto)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"result": result,
	})
}

func (u *UserController) createSubscriber(c echo.Context) error {
	userSubscriberId, convertErr := strconv.Atoi(c.FormValue("user_subscriber_id"))
	if convertErr != nil {
		return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Conversions error!", StatusCode: "400"})
	}

	createSubscriberDto := dto.CreateSubscriberDto{
		UserId:           c.Get("user_id").(int),
		UserSubscriberId: userSubscriberId,
	}

	result, err := u.userSubscriberService.SubscriberOperations(createSubscriberDto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Unexpected error: " + err.Error(), StatusCode: "500"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"result": result,
	})
}

func (u *UserController) history(c echo.Context) error {
	vName := c.Param("vName")

	createUserVideoHistoryDto := dto.CreateUserVideoHistoryDto{
		UserId: c.Get("user_id").(int),
	}

	result, err := u.userVideoHistoryService.CreateHistory(vName, createUserVideoHistoryDto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtos.ResponseMessage{Message: "Unexpected error: " + err.Error(), StatusCode: "500"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"subscriberStatus": result,
		"message":          "success",
		"status":           "200",
	})
}
