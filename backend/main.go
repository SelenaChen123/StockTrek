package main

import (
	"stock-treck-api/configs"
	"stock-treck-api/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	configs.ConnectDB()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "asdfasdfasdf",
		})
	})
	router.GET("/stock/:stockName", controller.GetStockData())
	router.Run()
}
