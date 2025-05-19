package handler

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strings"

	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/konnenl/vet-clinic/internal/validator"
)

type userHandler struct {
	repo repository.UserRepository
}

func newUserHandler(repo repository.UserRepository) *userHandler {
	return &userHandler{
		repo: repo,
	}
}

// GET("/profile", getProfile)
func (h *userHandler) getProfile(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	client, err := h.repo.GetByID(uint(claims.UserId))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(404, echo.Map{
				"error": "User not found",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	u := newClientResponse(client)
	return c.JSON(200, u)
}

// PUT("/profile/user", updateUser)
func (h *userHandler) updateUser(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	var r userUpdateRequest
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

	user := &model.User{
		Model: gorm.Model{
			ID: uint(claims.UserId),
		},
		Name:        r.Name,
		Surname:     r.Surname,
		Patronymic:  r.Patronymic,
		Email:       r.Email,
		PhoneNumber: r.PhoneNumber,
	}
	client := &model.Client{
		UserID:  uint(claims.UserId),
		Address: r.Address,
	}

	if err := h.repo.Update(user, client); err != nil {
		if strings.Contains(err.Error(), "email already exist") {
			return c.JSON(409, echo.Map{
				"error": "Email already in use",
			})
		}
		if err == gorm.ErrRecordNotFound {
			return c.JSON(404, echo.Map{
				"error": "User not found",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"message": "User updated successfully",
	})
}

// DELETE("/profile", unactiveUser)
func (h *userHandler) unactiveUser(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}
	err = h.repo.Deactivate(claims.UserId)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(404, echo.Map{
				"error": "User not found",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    "",
		HttpOnly: true,
		Path:     "/",
		MaxAge:   -1,
		//Secure:   true,
	})

	return c.JSON(http.StatusOK, echo.Map{
		"message": "User deactivated successfully",
	})
}
