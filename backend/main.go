package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// Create new instance of Gin engine
	router := gin.Default()

	// Route for baisc GET request
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "asdfasdfasdf",
		})
	})
}
