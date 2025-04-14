package main

import (
	"net/http"
	"log"
	"github.com/labstack/echo/v4"
	"github.com/konnenl/vet-clinic/pkg/database"
	"github.com/konnenl/vet-clinic/config"
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
	defer func() {
		if sqlDB, err := db.DB(); err == nil {
			sqlDB.Close()
		}
	}()

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "vet clinic API is running")
    })

	log.Printf("Starting server on %s", cfg.ServerPort)
	err = e.Start(cfg.ServerPort)
	if err != nil{
		log.Fatalf("Server error: %q", err)
	}
}
