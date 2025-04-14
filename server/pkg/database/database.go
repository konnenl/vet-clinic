package database

import(
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

func New() (*gorm.DB, error){
	db, err := gorm.Open(sqlite.Open("./data/data.db"), &gorm.Config{})
	if err != nil{	
		return nil, err
	}
	sqlDB, err := db.DB()
	if err != nil{
		return nil, err
	}
	sqlDB.SetMaxOpenConns(1)
	return db, nil
}

// func Migrate(db *gorm.DB){
// 	return
// }