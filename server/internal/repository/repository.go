package repository

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"gorm.io/gorm"
)

type Repository struct {
	User    UserRepository
	Pet     PetRepository
	Service ServiceRepository
	Visit   VisitRepository
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		User:    newUserRepository(db),
		Pet:     newPetRepository(db),
		Service: newServiceRepository(db),
		Visit:   newVisitRepository(db),
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
	Deactivate(petID uint) error
	GetAllByUserID(id uint) ([]model.Pet, error)
}

type VisitRepository interface {
	Create(visit *model.Visit) (uint, error)
	GetAll(userID uint) ([]model.Pet, error)
}
