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
