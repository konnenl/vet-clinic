package repository

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type Repository struct {
<<<<<<< HEAD
	User UserRepository
=======
	User    UserRepository
	Pet     PetRepository
	Service ServiceRepository
>>>>>>> 7fe4d561e2ccf0f17c1d3c20160f6e548c8b7abb
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
<<<<<<< HEAD
		User: newUserRepository(db),
=======
		User:    newUserRepository(db),
		Pet:     newPetRepository(db),
		Service: newServiceRepository(db),
>>>>>>> 7fe4d561e2ccf0f17c1d3c20160f6e548c8b7abb
	}
}

type UserRepository interface {
	Create(user *model.User) (uint, error)
	Authenticate(email string, password string) (*model.User, error)
	GetByID(id uint) (*model.Client, error)
	GetByEmail(email string) (*model.User, error)
	Update(user *model.User, client *model.Client) error
	Deactivate(id uint) error
}

type ServiceRepository interface {
	GetAll() ([]*model.Category, error)
}

type PetRepository interface {
	Create(pet *model.Pet, id uint) (uint, error)
	GetByID(id uint) (*model.Pet, error)
	Update(pet *model.Pet) error
	GetTypes() ([]*model.Type, error)
	CheckPetOwnership(petID uint, clientID uint) (bool, error)
}
