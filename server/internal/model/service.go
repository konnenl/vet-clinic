package model

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	Name       string  `gorm:"not null"`
	Price      float64 `gorm:"not null"`
	CategoryID uint
}

type Category struct {
	gorm.Model
	Name     string    `gorm:"not null"`
	Services []Service `gorm:"foreignKey:CategoryID"`
}
