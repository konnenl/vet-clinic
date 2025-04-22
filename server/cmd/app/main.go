package main

import (
	_"net/http"
	"log"
	"github.com/labstack/echo/v4"
	"github.com/konnenl/vet-clinic/internal/database"
	"github.com/konnenl/vet-clinic/config"
	
	_"github.com/konnenl/vet-clinic/internal/router"
	"github.com/konnenl/vet-clinic/internal/handler"
	"github.com/konnenl/vet-clinic/internal/validator"
	"github.com/konnenl/vet-clinic/internal/repository"
)


func main(){
	cfg, err := config.LoadConfig()
	if err != nil{
		log.Fatalf("Failed to load config: %q", err)
	}

	db, err := database.New()
	if err != nil{
		log.Fatalf("Failed to initialize database: %q", err)
	}
	err = database.Migrate(db)
	if err != nil{
		log.Fatalf("Migration failed: %v", err)
	}
	log.Println("Migration completed successfully!")
	defer func() {
		if sqlDB, err := db.DB(); err == nil {
			sqlDB.Close()
		}
	}()

	userRepo := repository.NewUserRepository(db)

	userHandler := handler.NewUserHandler(userRepo)

	//TODO group
	//TODO вынести
	//TODO auth middleware
	e := echo.New()
	//TODO красивый вывод от валидатора
	e.Validator = validator.New()
	e.POST("/users/signup", userHandler.CreateUser)
	e.POST("/users/login", userHandler.Login)
	e.GET("/users/:id", userHandler.GetUserByID)

	e.Logger.Fatal(e.Start(cfg.ServerPort))
}
