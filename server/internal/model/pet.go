package model

import (
	"gorm.io/gorm"
	"time"
	"gorm.io/datatypes"
)

type Gender rune
const(
	Female Gender = 'ж'
	Male Gender = 'м'
)

type Pet struct {
	gorm.Model
	Name             string    `gorm:"not null"`
	Gender           Gender    `gorm:"not null"`
	BreedID          uint      `gorm:"not null"`
	Breed            Breed     `gorm:"foreignKey:BreedID"`
	RegistrationDate time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	Color            string
	Weight           uint
	Notes            datatypes.JSON `gorm:"type:json"`
}

type Type struct {
	gorm.Model
	Name string `gorm:"not null"`
}

type Breed struct {
	gorm.Model
	Name   string `gorm:"not null"`
	TypeID uint   `gorm"not null"`
	Type   Type   `gorm:"foreignKey:TypeID"`
}
