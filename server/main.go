package main

import (
	"log"
	"net/http"
	"os"
	"youtube-clone/common/database"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	e := echo.New()

	database.InitDb("common/database/db.sqlite")

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{"Content-Type", "Origin", "Accept"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodDelete, http.MethodPut, http.MethodPatch},
	}))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	e.Logger.Fatal(e.Start("127.0.0.1:" + port))
}
