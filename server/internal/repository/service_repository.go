package repository

import (
	"gorm.io/gorm"
	"github.com/konnenl/vet-clinic/internal/model"
)

type serviceRepository struct{
	db *gorm.DB
}

func newServiceRepository(db *gorm.DB) *serviceRepository {
	return &serviceRepository{db: db}
}

func (r *serviceRepository) GetAll() ([]*model.Category, error){
	var categories []*model.Category
	if err := r.db.Model(&model.Category{}).Preload("Services").Find(&categories).Error; err != nil{
		return nil, err
	}
	return categories, nil
}