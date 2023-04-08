package controller

import (
	"context"
	"fmt"
	"net/http"
	"stock-treck-api/configs"
	"stock-treck-api/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var stocksCollection *mongo.Collection = configs.GetCollection(configs.DB, "stocks")

const (
	layout = "2006-01-02"
)

func GetStockData() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		// Parse URL param
		stockName := c.Param("stockName")
		// Parse query param
		endTime := c.Query("endTime")

		// Parse query param start time
		startTime, err := time.Parse(layout, c.Query("startTime"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "asdf",
			})
			return
		}

		var stock models.Stock
		defer cancel()

		err := stocksCollection.FindOne(ctx, bson.M{"name": stockName}).Decode(&stock)
		if err != nil {
			fmt.Print(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"name": stock.Name,
			"data": stock.Values,
		})
	}
}
