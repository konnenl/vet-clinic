package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"

	"github.com/konnenl/vet-clinic/config"
	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/database"
	"github.com/konnenl/vet-clinic/internal/handler"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/konnenl/vet-clinic/internal/validator"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %q", err)
	}

	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to initialize database: %q", err)
	}
	err = database.Migrate(db)
	if err != nil {
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
		Format: `${time_rfc3339} | ${method} | ${uri} | ${status} | ${latency_human} | ${error}` + "\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{echo.HeaderAuthorization, echo.HeaderContentType},
	}))
	e.Validator = validator.New()

	repos := repository.NewRepository(db)
	authService := auth.New(cfg.JWTSecretKey, 24*60)
	handlers := handler.NewHandler(repos, authService)

	port := ":" + cfg.ServerPort
	handlers.InitRoutes(e)
	e.Logger.Fatal(e.Start(port))
}
