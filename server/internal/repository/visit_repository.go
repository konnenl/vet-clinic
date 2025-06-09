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

func (r *visitRepository) GetAll(userID uint) ([]model.Pet, error) {
	var client model.Client
	if err := r.db.Where("user_id = ?", userID).First(&client).Error; err != nil {
		return nil, err
	}
	var pets []model.Pet
	if err := r.db.Preload("Visits.VisitServices.Service").Where("client_id = ?", client.ID).Find(&pets).Error; err != nil {
		return nil, err
	}
	return pets, nil
}
