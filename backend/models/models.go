package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type StockValue struct {
	Date  string  `bson:"name,omitempty" validate:"required"`
	Value float64 `bson:"value,omitempty" validate:"required"`
}

type Stock struct {
	Id       primitive.ObjectID `bson:"id,omitempty"`
	Ticker   string             `bson:"ticker,omitempty" validate:"required"`
	Company  string             `bson:"company,omitempty" validate:"required"`
	Industry string             `bson:"industry,omitempty" validate:"required"`
	Values   []StockValue       `bson:"values,omitempty" validate:"required"`
}

type User struct {
	Username    string   `bson:"username"`
	Password    string   `bson:"password"`
	Initialized bool     `bson:"initialized"`
	UserInfo    UserInfo `bson:"userInfo"`
}

type NewUserInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type StockCurrentlyInvested struct {
	Ticker     string  `bson:"ticker" validate:"required"`
	AmountHeld int     `bson:"amountHeld" validate:"required"`
	NetGain    float64 `bson:"netGain" validate:"required"`
}

type UserInfo struct {
	Money                   float64                  `bson:"username"`
	CurrentSimDate          string                   `bson:"currentSimDate"`
	StocksCurrentlyInvested []StockCurrentlyInvested `bson:"stocksCurrentlyInvested"`
}
