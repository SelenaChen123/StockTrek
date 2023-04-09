package controller

import (
	"context"
	"fmt"
	"net/http"
	"stock-treck-api/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func Invest() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var investData models.InvestInput

		err := c.BindJSON(&investData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "must include username and amount fields"})
			return
		}

		var userData models.User

		err = usersCollection.FindOne(ctx, bson.M{"username": investData.Username}).Decode(&userData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot find user"})
			return
		}
		var stock models.Stock
		err = stocksCollection.FindOne(ctx, bson.M{"ticker": investData.Ticker}).Decode(&stock)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot find stock"})
			return
		}
		currPrice := 0.0
		for _, val := range stock.Values {
			if val.Date == userData.UserInfo.CurrentSimDate {
				currPrice = val.Value
				break
			}
		}
		newMoney := userData.UserInfo.Money + (float64(-investData.Amount) * currPrice)

		stockI := -1
		for i, val := range userData.UserInfo.StocksCurrentlyInvested {
			if val.Ticker == investData.Ticker {
				stockI = i
				break
			}
		}
		if stockI == -1 {
			newStockInvested := models.StockCurrentlyInvested{Ticker: investData.Ticker, AmountHeld: investData.Amount, NetGain: 0.0}
			_, err = usersCollection.UpdateOne(
				ctx,
				bson.M{"username": investData.Username},
				bson.M{
					"$set":  bson.M{"userInfo.money": newMoney},
					"$push": bson.M{"userInfo.stocksCurrentlyInvested": newStockInvested},
				},
			)
		} else {
			newAmountHeld := userData.UserInfo.StocksCurrentlyInvested[stockI].AmountHeld + investData.Amount
			if newAmountHeld == 0 {
				_, err = usersCollection.UpdateOne(
					ctx,
					bson.M{"username": investData.Username},
					bson.M{
						"$set":  bson.M{"userInfo.money": newMoney},
						"$pull": bson.M{"userInfo.stocksCurrentlyInvested": bson.M{"ticker": investData.Ticker}},
					},
				)
			} else {
				_, err = usersCollection.UpdateOne(
					ctx,
					bson.M{"username": investData.Username},
					bson.M{"$set": bson.M{
						"userInfo.money": newMoney,
						"userInfo.stocksCurrentlyInvested." + fmt.Sprint(stockI) + ".amountHeld": newAmountHeld,
					}},
				)
			}
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot update user values; " + fmt.Sprint(err)})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": "success"})
	}
}
