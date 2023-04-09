package main

import (
	"stock-treck-api/configs"
	"stock-treck-api/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	configs.ConnectDB()

	router.GET("/stock/:ticker", controller.FilterStock())
	router.GET("/stocks", controller.GetStocks())
	router.GET("/login", controller.Login())
	router.POST("/register", controller.Register())
	router.POST("/invest", controller.Invest())
	router.POST("/reset", controller.Reset())
	router.GET("/user-data", controller.UserData())
	router.GET("/featured-stocks", controller.GetFeaturedInvestments())
	router.PUT("/update-stocks", controller.UpdateStocks())

	router.Run()
}
