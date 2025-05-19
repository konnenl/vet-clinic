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
}

func NewHandler(repository *repository.Repository, authService *auth.JWTService) *Handler {
	return &Handler{
		AuthService: authService,
		user:        newUserHandler(repository.User),
		auth:        newAuthHandler(repository.User, authService),
	}
}

func (h *Handler) InitRoutes(e *echo.Echo) {
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
	users.DELETE("", h.user.unactiveUser)
}
