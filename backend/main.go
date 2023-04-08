package main

import (
	"stock-treck-api/configs"
	"stock-treck-api/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectDB()

	router.GET("/stock/:ticker", controller.FilterStock())
	router.GET("/login", controller.Login())
	router.POST("/signup", controller.Signup())

	router.Run()
}
