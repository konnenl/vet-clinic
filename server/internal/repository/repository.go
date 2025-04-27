package repository

import(
	"gorm.io/gorm"
    "github.com/konnenl/vet-clinic/internal/model"
)

type Repository struct{
	User UserRepository
}

func NewRepository(db *gorm.DB) *Repository{
	return &Repository{
		User: NewUserRepository(db),
	}
}

type UserRepository interface{
    Create(user *model.User) error
    GetByID(id uint) (*model.User, error)
    GetByEmail(email string) (*model.User, error)
    Update(user *model.User) error
    Deactivate(id uint) error
}