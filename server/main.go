package main

import (
	"log"
	"net/http"
	"os"
	"youtube-clone/common/database"
	"youtube-clone/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type CustomContext struct {
	echo.Context
}

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	e := echo.New()

	e.Static("/static", "public")

	db := database.InitDb("common/database/db.sqlite")
	defer database.CloseDb()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowHeaders:     []string{"Content-Type", "Origin", "Accept"},
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodDelete, http.MethodPut, http.MethodPatch},
		AllowCredentials: true,
	}))

	webRoutes := routes.NewWebRoutes()
	webRoutes.Routes(e, db)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	e.Logger.Fatal(e.Start(":" + port))
}
