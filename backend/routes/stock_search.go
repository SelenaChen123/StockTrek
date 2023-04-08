package routes

import (
	"github.com/gin-gonic/gin"
)

func StockTimeRange(router *gin.Engine) {
	router.GET("/api/stocks/:name")
}
