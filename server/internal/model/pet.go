package model

import (
	"gorm.io/gorm"
	"time"
)

type Gender rune

const (
	Female Gender = 'ж'
	Male   Gender = 'м'
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
	IsActive         bool `gorm:"default:true"`
	ClientID         uint
	Visits           []Visit `gorm:"foreignKey:PetID"`
}

type Type struct {
	gorm.Model
	Name   string  `gorm:"not null"`
	Breeds []Breed `gorm:"foreignKey:TypeID"`
}

type Breed struct {
	gorm.Model
	Name   string `gorm:"not null"`
	Type   Type   `gorm:"foreignKey:TypeID"`
	TypeID uint   `gorm"not null"`
}
