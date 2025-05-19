package repository

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type petRepository struct {
	db *gorm.DB
}

func newPetRepository(db *gorm.DB) *petRepository {
	return &petRepository{db: db}
}

func (r *petRepository) Create(pet *model.Pet) (uint, error) {
	r.db.Model(&model.User{}).Association("Pet").Append()

	if err := r.db.Create(&pet).Error; err != nil {
		return 0, err
	}
	return pet.ID, nil
}

func (r *petRepository) GetByID(id uint) (*model.Pet, error) {
	var pet model.Pet
	if err := r.db.First(&pet, id).Error; err != nil {
		return nil, err
	}
	return &pet, nil
}

func (r *petRepository) Update(pet *model.Pet) error {
	if err := r.db.Save(&pet).Error; err != nil {
		return err
	}
	return nil
}

func (r *petRepository) Deactivate(id uint) error {
	res := r.db.Model(&model.Pet{}).
		Where("id = ?", id).
		Update("is_active", false)

	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (r *petRepository) GetTypes() ([]*model.Type, error) {
	var types []*model.Type
	if err := r.db.Model(&model.Type{}).Preload("Breeds").Find(&types).Error; err != nil {
		return nil, err
	}
	return types, nil
}
