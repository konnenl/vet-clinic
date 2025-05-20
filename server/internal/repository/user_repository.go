package repository

import (
	"errors"
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
	"strings"
)

type userRepository struct {
	db *gorm.DB
}

func newUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *model.User) (uint, error) {
	if err := r.db.Create(&user).Error; err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed: users.email") {
			return 0, errors.New("email already exist")
		}
		return 0, err
	}
<<<<<<< HEAD
=======
	client := &model.Client{
		UserID: user.ID, 
	}
	if err := r.db.Create(client).Error; err != nil {
		return 0, err
	}
>>>>>>> 7fe4d561e2ccf0f17c1d3c20160f6e548c8b7abb
	return user.ID, nil
}

func (r *userRepository) Authenticate(email string, password string) (*model.User, error) {
	user, err := r.GetByEmail(email)
	if err != nil {
		return nil, err
	}
	if !user.IsActive {
		return nil, errors.New("user is deleted")
	}
	if model.CheckPassword(user.Password, password) != nil {
		return nil, errors.New("invalid password")
	}
	return user, nil
}

//TODO check is active
func (r *userRepository) GetByID(id uint) (*model.Client, error) {
	var client model.Client
	if err := r.db.Preload("User").Preload("Pets").Where("user_id = ?", id).First(&client).Error; err != nil {
		return nil, err
	}
	return &client, nil
}

func (r *userRepository) GetByEmail(email string) (*model.User, error) {
	var user model.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) Update(user *model.User, client *model.Client) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if user.Email != "" {
			var existing model.User
			if err := tx.Where("email = ? AND id != ?", user.Email, user.ID).First(&existing).Error; err == nil {
				return errors.New("email already exists")
			} else if !errors.Is(err, gorm.ErrRecordNotFound) {
				return err
			}
		}
		if err := tx.Save(user).Error; err != nil {
			return err
		}
		if client != nil {
			if err := tx.Save(client).Error; err != nil {
				return err
			}
		}
		return nil
	})
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
