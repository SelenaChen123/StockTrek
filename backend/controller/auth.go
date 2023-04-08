package controller

import (
	"context"
	"crypto/sha1"
	"encoding/base64"
	"net/http"
	"stock-treck-api/configs"
	"stock-treck-api/models"
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

func Signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var newUser models.NewUserInfo

		err := c.BindJSON(&newUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "must include username, password, and initialMoney fields"})
			return
		}
		hasher := sha1.New()
		hasher.Write([]byte(newUser.Password))
		sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))

		newUserDb := models.User{Username: newUser.Username, Password: sha, Initialized: false}

		_, err = usersCollection.InsertOne(ctx, newUserDb)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": "success"})
	}
}
