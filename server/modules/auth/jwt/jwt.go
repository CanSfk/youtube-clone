package jwt

import (
	"net/http"
	"time"
	"youtube-clone/common/dtos"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

var jwtKey = []byte("your_secret_key")

type Claims struct {
	Username string `json:"user_name"`
	jwt.StandardClaims
}

func CreateJwt(userName string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: userName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString(jwtKey)

	return tokenString, nil
}

func JWTMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		tokenString, err := c.Cookie("authorization")
		if err != nil {
			return c.JSON(http.StatusUnauthorized, dtos.ResponseMessage{Message: "Missing or invalid token", StatusCode: "401"})
		}

		token, err := jwt.ParseWithClaims(tokenString.Value, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, dtos.ResponseMessage{Message: "Missing or invalid token", StatusCode: "401"})
		}

		claims, ok := token.Claims.(*Claims)
		if !ok || !token.Valid {
			return c.JSON(http.StatusUnauthorized, dtos.ResponseMessage{Message: "Missing or invalid token", StatusCode: "401"})
		}

		c.Set("username", claims.Username)
		return next(c)
	}
}
