package model

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("ProductMock.db"))

	if err != nil {
		panic("Failed to connect to database!")
	}
	DB = database
}

// Product Struct (Model)
type ProdMaster struct {
	ID          int64   `gorm:"AUTO_INCREMENT;PRIMARY_KEY;not_null" json:"id"`
	Name        string  `gorm:"type:varchar(255);NOT NULL" json:"name"`
	Category    string  `"gorm:varchar(255)" json="category"`
	Price       float32 `gorm:"type:decimal(10,2)" json:"price"`
	Description string  `gorm:"type:text" json:"description"`
}

// type CategoryMaster struct {
// 	CatID        int    `gorm:"PRIMARY_KEY;not_null" json:"catid"`
// 	CategoryName string `gorm:"type:varchar(255)" json:"categoryname"`
// }
type ProductMock struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type ProductMockUpdate struct {
	ID       string   `json:"productId"`
	Name     string   `json:"productName"`
	Category []string `json:"productCategory"`
}

type CategoryMock struct {
	ID          string `json:"categoryId"`
	Name        string `json:"categoryName"`
	Description string `json:"description"`
	Price       string `json:"price"`
	Rating      string `json:"rating"`
}
