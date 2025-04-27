package handler

import(
	"github.com/labstack/echo/v4"
	"github.com/konnenl/vet-clinic/internal/repository"
)

type Handler struct{
	User *UserHandler
}

func NewHandler(repository *repository.Repository) *Handler{
	return &Handler{
		User: NewUserHandler(repository.User),
	}
}

func(h *Handler) InitRoutes(e *echo.Echo){
	auth := e.Group("/auth")
	auth.POST("/sign-up", h.User.signUp)
	auth.POST("/sign-in", h.User.signIn)

	users := e.Group("/users")
	users.GET("/:id", h.User.getUserByID)
	users.PUT("/:id", h.User.updateUser)
	users.DELETE("/:id", h.User.unactiveUser)
}