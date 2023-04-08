package controller

import (
	"context"
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

func FilterStock() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Parse URL param
		ticker := c.Param("ticker")
		var stock models.Stock
		filter := bson.M{"ticker": ticker}
		err := stocksCollection.FindOne(ctx, filter).Decode(&stock)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Ticker not found."})
			return
		}

		// Check if query params exist
		start := c.Query("startDate")
		end := c.Query("endDate")
		if len(start) == 0 || len(end) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Empty query parameters.",
			})
			return
		}

		// Parse query param start date
		startDate, err := time.Parse(layout, start)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid start date.",
			})
			return
		}
		// Parse query param end date
		endDate, err := time.Parse(layout, end)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid end date.",
			})
			return
		}

		// Calculate how many stocks to retrieve
		var numDays int = int(endDate.Sub(startDate).Hours()/24) + 1
		var stockValues []models.StockValue = make([]models.StockValue, 0, numDays)

		// Get timeframe of stock values
		for _, value := range stock.Values {
			if start <= value.Date && value.Date <= end {
				stockValues = append(stockValues, value)
			}
		}

		// Return company stock information
		c.JSON(http.StatusOK, gin.H{
			"name":     stock.Company,
			"ticker":   stock.Ticker,
			"industry": stock.Industry,
			"data":     stockValues,
		})
	}
}
