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

func (r *UserRepository) Unactive(id int) error{
	res := r.DB.Model(&model.User{}).
		Where("id = ?", id).
		Update("is_active", false)
	if res.Error != nil{
		return res.Error
	}
	if res.RowsAffected == 0{
		return gorm.ErrRecordNotFound
	}
	return nil
}

func(r *UserRepository) GetByEmail(email string) (*model.User, error){
	var user model.User
	res := r.DB.First(&user).Where("email = ?", email)
	if res.Error != nil{
		return nil, res.Error
	}
	if res.RowsAffected == 0{
		return nil, gorm.ErrRecordNotFound
	}
	return &user, nil
}