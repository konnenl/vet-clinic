package model

import (
	"gorm.io/gorm"
	"time"
)

type Visit struct {
	gorm.Model
	VisitDate     time.Time
	Type          string
	Status        string
	Cost          float64
	VisitServices []VisitServices `gorm:"foreignKey:VisitID"`
}

type VisitServices struct {
	gorm.Model
	Symptom           string
	Diagnosis         string
	Comment           string
	EmployeeServiceID uint
	VisitID           uint
}
