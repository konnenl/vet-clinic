package repository

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type Repository struct {
	User UserRepository
	Service ServiceRepository
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		User: newUserRepository(db),
		Service: newServiceRepository(db),
	}
}

type UserRepository interface {
	Create(user *model.User) (uint, error)
	Authenticate(email string, password string) (*model.User, error)
	GetByID(id uint) (*model.User, error)
	GetByEmail(email string) (*model.User, error)
	Update(user *model.User) error
	Deactivate(id uint) error
}

type ServiceRepository interface{
	GetAll() ([]*model.Category, error)
}