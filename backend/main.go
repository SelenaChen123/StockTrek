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
	router.POST("/signin", controller.Signin())
	router.POST("/invest", controller.Invest())

	router.Run()
}
