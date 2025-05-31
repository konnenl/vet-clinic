package model

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	UserID     uint
	Position   string
	Speciality string
}
