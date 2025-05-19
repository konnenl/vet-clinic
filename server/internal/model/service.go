package model

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	Name string
	Price float64
	CategoryID uint
}

type Category struct {
	gorm.Model
	Name string
	Services []Service `gorm:"foreignKey:CategoryID"`
}