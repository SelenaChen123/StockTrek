package models

type InvestInput struct {
	Username string `json:"username"`
	Ticker   string `json:"ticker"`
	Amount   int    `json:"amount"`
}
