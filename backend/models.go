package main

import "go.mongodb.org/mongo-driver/bson/primitive"

type StockValue struct {
	Date  string  `json:"name,omitempty" validate:"required"`
	Value float64 `json:"value,omitempty" validate:"required"`
}

type Stock struct {
	Id     primitive.ObjectID `json:"id,omitempty"`
	Name   string             `json:"name,omitempty" validate:"required"`
	Values []StockValue       `json:"values,omitempty" validate:"required"`
}
