package main

import (
	_"net/http"
	"log"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/konnenl/vet-clinic/internal/database"
	"github.com/konnenl/vet-clinic/config"
	
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
	
	e := echo.New()
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `${time_rfc3339} | ${method} | ${uri} | ${status} | ${latency_human}` + "\n",
	}))
	//TODO вывод от валидатора
	e.Validator = validator.New()

	repos := repository.NewRepository(db)
	handlers := handler.NewHandler(repos)

	handlers.InitRoutes(e)
	e.Logger.Fatal(e.Start(cfg.ServerPort))
}
