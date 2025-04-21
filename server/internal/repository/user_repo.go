package repository

import(
	"gorm.io/gorm"
	"github.com/konnenl/vet-clinic/internal/model"
)

type UserRepository struct{
	BaseRepository[model.User]
}

func NewUserRepository(db *gorm.DB) *UserRepository{
	return &UserRepository{
		BaseRepository: BaseRepository[model.User]{
			DB: db,
		},
	}
}