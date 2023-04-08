package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type StockValue struct {
	Date  string  `json:"name,omitempty" validate:"required"`
	Value float64 `json:"value,omitempty" validate:"required"`
}

type Stock struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Ticker   string             `json:"ticker,omitempty" validate:"required"`
	Company  string             `json:"company,omitempty" validate:"required"`
	Industry string             `json:"industry,omitempty" validate:"required"`
	Values   []StockValue       `json:"values,omitempty" validate:"required"`
}

type User struct {
	Username    string   `json:"username"`
	Password    string   `json:"password"`
	Initialized bool     `json:"initialized"`
	UserInfo    UserInfo `json:"userInfo"`
}

type NewUserInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type StockCurrentlyInvested struct {
	Ticker     string  `json:"ticker" validate:"required"`
	AmountHeld int     `json:"amountHeld" validate:"required"`
	NetGain    float64 `json:"netGain" validate:"required"`
}

type UserInfo struct {
	Money                   float64                  `json:"username"`
	CurrentSimDate          string                   `json:"currentSimDate"`
	StocksCurrentlyInvested []StockCurrentlyInvested `json:"stocksCurrentlyInvested"`
}
