package repository

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
	_ "strings"
)

type visitRepository struct {
	db *gorm.DB
}

func newVisitRepository(db *gorm.DB) *visitRepository {
	return &visitRepository{db: db}
}

func (r *visitRepository) Create(visit *model.Visit) (uint, error) {
	if err := r.db.Create(&visit).Error; err != nil {
		return 0, err
	}
	return visit.ID, nil
}
