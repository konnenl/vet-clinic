package handler

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"

	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
)

type userHandler struct {
	repo repository.UserRepository
}

func newUserHandler(repo repository.UserRepository) *userHandler {
	return &userHandler{
		repo: repo,
	}
}

//TODO not found везде
//TODO errors

// GET("/profile", getProfile)
func (h *userHandler) getProfile(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	user, err := h.repo.GetByID(uint(claims.UserId))
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Failed to get user",
		})
	}
	u := newUserResponse(user)
	return c.JSON(http.StatusOK, u)
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

	var u userUpdateRequest
	if err := c.Bind(&u); err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}
	if err := c.Validate(u); err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}
	var user model.User
	if err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}
	//TODO в request bind
	user.ID = uint(claims.UserId)
	user.Name = u.Name
	user.Surname = u.Surname
	user.Patronymic = u.Patronymic
	user.Email = u.Email
	user.PhoneNumber = u.PhoneNumber

	if err := h.repo.Update(&user); err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(404, echo.Map{
				"error": "User not found",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Failed to update user",
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
			"error": "Failed to delete user",
		})
	}

	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    "",
		HttpOnly: true,
		Path: "/",
		MaxAge: -1,
		//Secure:   true,
	})


	return c.JSON(http.StatusOK, echo.Map{
		"message": "User deactivated successfully",
	})
}
