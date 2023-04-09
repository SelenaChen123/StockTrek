package controller

import (
	"context"
	"fmt"
	"net/http"
	"stock-treck-api/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetStocks() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		search := c.Query("search")
		// industry := c.Query("industry")
		pageNumStr := c.DefaultQuery("pageNum", "1")
		pageNum, err := strconv.Atoi(pageNumStr)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		currDateStr := c.Query("currentDate")
		currDate, err := time.Parse("2006-01-02", currDateStr)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid currentDate query param; should be YYYY-MM-DD"})
			return
		}

		var stocks []models.Stock

		findOptions := options.Find()
		findOptions.SetSort(bson.M{"ticker": 1})
		findOptions.SetLimit(10)
		findOptions.SetSkip(int64(10 * (pageNum - 1)))
		cursor, err := stocksCollection.Find(
			ctx,
			bson.M{"ticker": bson.M{"$regex": "^" + search}},
			findOptions,
		)
		if err != nil {
			fmt.Print(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		defer cursor.Close(ctx)
		err = cursor.All(ctx, &stocks)
		if err != nil {
			fmt.Print(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		for i, stock := range stocks {
			var vals []models.DatedValue
			for _, val := range stock.Values {
				date, _ := time.Parse("2006-01-02", val.Date)
				if date.Compare(currDate) > 0 {
					break
				}
				vals = append(vals, val)
			}
			filtered := vals[len(vals)-14:]
			stocks[i].Values = filtered
		}

		c.JSON(http.StatusOK, gin.H{
			"data": stocks,
		})
	}
}
