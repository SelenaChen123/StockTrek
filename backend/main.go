package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	ConnectDB()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "asdfasdfasdf",
		})
	})
	router.GET("/stock/:stockName", GetStockData())
	router.Run()
}
