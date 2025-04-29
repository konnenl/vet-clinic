package repository

import (
	"fmt"
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func newUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *model.User) (uint, error) {
	if err := r.db.Create(&user).Error; err != nil {
		return 0, err
	}
	return user.ID, nil
}

func (r *userRepository) Authenticate(email string, password string) (*model.User, error) {
	user, err := r.GetByEmail(email)
	if err != nil {
		return nil, fmt.Errorf("user not found")
	}
	if model.CheckPassword(user.Password, password) != nil {
		return nil, fmt.Errorf("invalid password")
	}
	return user, nil
}

func (r *userRepository) GetByID(id uint) (*model.User, error) {
	var user model.User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) GetByEmail(email string) (*model.User, error) {
	var user model.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) Update(user *model.User) error {
	return r.db.Save(&user).Error
}

func (r *userRepository) Deactivate(id uint) error {
	res := r.db.Model(&model.User{}).
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
