package model

import (
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	Name            string  `gorm:"not null"`
	Price           float64 `gorm:"not null"`
	CategoryID      uint
	EmployeeService []EmployeeService `gorm:"foreignKey:ServiceID"`
}

type Category struct {
	gorm.Model
	Name     string    `gorm:"not null"`
	Services []Service `gorm:"foreignKey:CategoryID"`
}

type EmployeeService struct {
	gorm.Model
	ServiceID  uint
	EmployeeID uint
	Employee   Employee `gorm:"foreignKey:EmployeeID"`
}
