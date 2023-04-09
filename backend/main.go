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
	router.POST("/register", controller.Register())
	router.POST("/invest", controller.Invest())
	router.POST("/reset", controller.Reset())
	router.GET("/featured-stocks", controller.GetFeaturedInvestments())
	router.PUT("/update-stocks", controller.UpdateStocks())

	router.Run()
}
