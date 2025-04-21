package repository

import(	
	"gorm.io/gorm"
)

type BaseRepository[T any] struct{
	DB *gorm.DB
}

func (r *BaseRepository[T]) Create(entity *T) error{
	return r.DB.Create(entity).Error
}

func (r *BaseRepository[T]) GetByID(id int) (*T, error){
	var entity T
	if err := r.DB.First(&entity, id).Error; err != nil{
		return nil, err
	}
	return &entity, nil
}