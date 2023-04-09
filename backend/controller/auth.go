package controller

import (
	"context"
	"crypto/sha1"
	"encoding/base64"
	"fmt"
	"math/rand"
	"net/http"
	"stock-treck-api/configs"
	"stock-treck-api/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var usersCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		username := c.Query("username")
		password := c.Query("password")

		var user models.User

		err := usersCollection.FindOne(ctx, bson.M{"username": username}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		hasher := sha1.New()
		hasher.Write([]byte(password))
		sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
		c.JSON(http.StatusOK, gin.H{"data": sha == user.Password})
	}
}

func Register() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var newUser models.NewUserInfo

		err := c.BindJSON(&newUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "must include username, password, and initialMoney fields"})
			return
		}

		existing, err := usersCollection.CountDocuments(ctx, bson.M{"username": newUser.Username})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprint(err)})
			return
		}
		if existing != 0 {
			c.JSON(http.StatusConflict, gin.H{"error": "user already exists"})
			return
		}

		hasher := sha1.New()
		hasher.Write([]byte(newUser.Password))
		sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

		var defaultUserInfo models.UserInfo
		defaultUserInfo.StocksCurrentlyInvested = []models.StockCurrentlyInvested{}
		newUserDb := models.User{Username: newUser.Username, Password: sha, Initialized: false, UserInfo: defaultUserInfo}

		_, err = usersCollection.InsertOne(ctx, newUserDb)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": "success"})
	}
}

func UserData() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		username := c.Query("username")

		var userData models.User
		usersCollection.FindOne(ctx, bson.M{"username": username}).Decode(&userData)

		c.JSON(http.StatusOK, userData.UserInfo)
	}
}

func Reset() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		username := c.Query("username")
		initMoneyStr := c.Query("initMoney")
		initMoney, err := strconv.Atoi(initMoneyStr)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		maxDate := time.Date(2023, 4, 8, 0, 0, 0, 0, time.UTC).Unix()
		minDate := time.Date(2022, 4, 8, 0, 0, 0, 0, time.UTC).Unix()
		secsBtw := maxDate - minDate
		secs := rand.Int63n(secsBtw)
		newDate := time.Unix(minDate+secs, 0)
		newDateString := newDate.String()[:len("xxxx-xx-xx")]

		newUserInfo := models.UserInfo{
			Money:                   float64(initMoney),
			CurrentSimDate:          newDateString,
			NetProfits:              []models.DatedValue{},
			StocksCurrentlyInvested: []models.StockCurrentlyInvested{},
		}

		_, err = usersCollection.UpdateOne(
			ctx,
			bson.M{"username": username},
			bson.M{"$set": bson.M{"initialized": true, "userInfo": newUserInfo}},
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": "success"})
	}
}
