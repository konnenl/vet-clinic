package handler

import (
	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	AuthService *auth.JWTService
	user        *userHandler
	auth        *authHandler
	pet         *petHandler
	service     *serviceHandler
	visit       *visitHandler
}

func NewHandler(repository *repository.Repository, authService *auth.JWTService) *Handler {
	return &Handler{
		AuthService: authService,
		user:        newUserHandler(repository.User),
		pet:         newPetHandler(repository.Pet),
		auth:        newAuthHandler(repository.User, authService),
		service:     newServiceHandler(repository.Service),
		visit:       newVisitHandler(repository.Visit),
	}
}

func (h *Handler) InitRoutes(e *echo.Echo) {
	//TODO rename
	e.GET("/test", func(c echo.Context) error {
		return echo.NewHTTPError(200, "vet-clinic")
	})
	auth := e.Group("/auth")
	auth.POST("/signup", h.auth.signUp)
	auth.POST("/signin", h.auth.signIn)
	auth.POST("/logout", h.auth.logout)

	users := e.Group("/profile")
	users.Use(h.AuthService.Middleware())
	users.GET("", h.user.getProfile)
	users.PUT("/user", h.user.updateUser)
	users.DELETE("", h.user.deactivateUser)
	users.POST("/pet", h.pet.createPetPost)
	users.GET("/pet/all", h.pet.getAllPets)
	users.GET("/pet", h.pet.createPetGet)
	users.PUT("/pet/:petID", h.pet.updatePet)
	users.DELETE("/pet/:petID", h.pet.deactivatePet)

	visit := e.Group("/visits")
	visit.Use(h.AuthService.Middleware())
	visit.POST("", h.visit.createVisit)
	// visit.GET("/:visitID", h.visit.getByID)
	visit.GET("", h.visit.getAll)

	main := e.Group("main")
	main.GET("/services", h.service.getAllServices)
}
