package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"

	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/konnenl/vet-clinic/internal/validator"
)

type authHandler struct {
	repo        repository.UserRepository
	authService *auth.JWTService
}

func newAuthHandler(repo repository.UserRepository, authService *auth.JWTService) *authHandler {
	return &authHandler{
		repo:        repo,
		authService: authService,
	}
}

//TODO not found везде
//TODO errors

// POST("auth/signup", signUp)
func (h *authHandler) signUp(c echo.Context) error {
	var r userRegisterRequest
	if err := c.Bind(&r); err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}

	if err := c.Validate(r); err != nil {
		return c.JSON(400, echo.Map{
			"error":  "Validation failed",
			"fields": validator.GetValidationErrors(err),
		})
	}

	//TODO вынести в func bind request
	hashedPassword, err := model.HashPassword(r.Password)
	if err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}
	//TODO add roles
	user := &model.User{
		Name:     r.Name,
		Surname:  r.Surname,
		Email:    r.Email,
		Password: hashedPassword,
		Role:     "user",
	}
	//TODO add flag for role
	id, err := h.repo.Create(user)
	if err != nil {
		if strings.Contains(err.Error(), "email already exist") {
			return c.JSON(409, echo.Map{
				"error": "Email already in use",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Failed to create user",
		})
	}

	token, err := h.authService.GenerateToken(id, user.Role)
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	return c.JSON(201, echo.Map{
		"id": id,
		"token": token,
	})
}

// POST("auth/signin", signIn)
func (h *authHandler) signIn(c echo.Context) error {
	var r userLoginRequest
	if err := c.Bind(&r); err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}
	if err := c.Validate(r); err != nil {
		return c.JSON(400, echo.Map{
			"error":  "Validation failed",
			"fields": validator.GetValidationErrors(err),
		})
	}
	user, err := h.repo.Authenticate(r.Email, r.Password)
	if err != nil {
		return c.JSON(401, echo.Map{
			"error": "Invalid credentials",
		})
	}

	token, err := h.authService.GenerateToken(user.ID, user.Role)
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	return c.JSON(200, echo.Map{
		"id": user.ID,
		"token": token,
	})
}

func (h *authHandler) logout(c echo.Context) error {
	//TODO token blacklist
	return c.JSON(200, echo.Map{
		"message": "Successfully logged out",
	})
}
