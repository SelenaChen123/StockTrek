package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var stocksCollection *mongo.Collection = GetCollection(DB, "stocks")

func GetStockData() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		stockName := c.Param("stockName")
		var stock Stock
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
