package repository

import (
	"errors"
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type petRepository struct {
	db *gorm.DB
}

func newPetRepository(db *gorm.DB) *petRepository {
	return &petRepository{db: db}
}

func (r *petRepository) Create(pet *model.Pet, id uint) (uint, error) {
	var client model.Client
	if err := r.db.Where("user_id = ?", id).First(&client).Error; err != nil {
		return 0, err
	}
	pet.ClientID = client.ID
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

func (r *petRepository) CheckPetOwnership(petID uint, userID uint) (bool, error) {
	var client model.Client
	if err := r.db.Where("user_id = ?", userID).First(&client).Error; err != nil {
		return false, err
	}
	var count int64
	err := r.db.Model(&model.Pet{}).
		Where("id = ? AND client_id = ?", petID, client.ID).
		Count(&count).
		Error

	if err != nil {
		return false, errors.New("failed to check pet ownership")
	}

	return count > 0, nil
}
