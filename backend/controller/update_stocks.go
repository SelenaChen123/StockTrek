package controller

import (
	"context"
	"net/http"
	"stock-treck-api/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type updateStocksBody struct {
	Username string `json:"username"`
	Days     int    `json:"days"`
}

func UpdateStocks() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Get fast forward information from body
		var body updateStocksBody
		err := c.ShouldBindJSON(&body)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Get user from username
		var user models.User
		filter := bson.M{"username": body.Username}
		err = usersCollection.FindOne(ctx, filter).Decode(&user)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found."})
			return
		}

		currentDate, err := time.Parse(layout, user.UserInfo.CurrentSimDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid simulation date from user."})
			return
		}

		// Increment days for fast forward
		for i := 0; i < body.Days; i++ {
			// Iterate stocks invested by user
			for j, stockInvested := range user.UserInfo.StocksCurrentlyInvested {

				// Get current date stock
				var stockInfo models.Stock
				filter := bson.M{"ticker": stockInvested.Ticker}
				err := stocksCollection.FindOne(ctx, filter).Decode(&stockInfo)
				if err != nil {
					c.JSON(http.StatusNotFound, gin.H{"error": "Ticker not found."})
					return
				}

				// Get current and next day stock value
				var currentStockValue float64
				var nextStockValue float64
				for k, stockTimeStamp := range stockInfo.Values {
					if stockTimeStamp.Date == currentDate.Format(layout) {
						currentStockValue = stockTimeStamp.Value
						nextStockValue = stockInfo.Values[k+1].Value
						break
					}
				}

				// Update gain/loss of investment
				deltaProfit := nextStockValue - currentStockValue
				netProfit := float64(stockInvested.AmountHeld) * deltaProfit

				user.UserInfo.NetProfits = append(
					user.UserInfo.NetProfits,
					models.DatedValue{
						Date:  currentDate.Format(layout),
						Value: netProfit,
					},
				)
				user.UserInfo.StocksCurrentlyInvested[j].NetGain += netProfit
				user.UserInfo.Money += netProfit
			}

			// Next day
			currentDate = currentDate.AddDate(0, 0, 1)
			for currentDate.Weekday() == time.Saturday || currentDate.Weekday() == time.Sunday {
				currentDate = currentDate.AddDate(0, 0, 1)
			}
		}
		user.UserInfo.CurrentSimDate = currentDate.Format(layout)

		// Update record in DB
		update := bson.M{"$set": bson.M{
			"userInfo": user.UserInfo,
		}}
		result, err := usersCollection.UpdateOne(ctx, filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Check if any documents were updated
		if result.ModifiedCount == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "User investments not found."})
			return
		}

		c.JSON(http.StatusAccepted, gin.H{
			"stocksInvested": user.UserInfo,
		})
	}
}
