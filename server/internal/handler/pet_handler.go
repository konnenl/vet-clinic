package handler

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"

	"github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/konnenl/vet-clinic/internal/validator"
)

type petHandler struct {
	repo repository.PetRepository
}

func newPetHandler(repo repository.PetRepository) *petHandler {
	return &petHandler{
		repo: repo,
	}
}

// users.POST("/pet", h.user.createPetPost)
func (h *petHandler) createPetPost(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}
	var r petRequest
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
	var gender model.Gender
	if r.Gender == "ж" {
		gender = model.Female
	} else {
		gender = model.Male
	}

	pet := &model.Pet{
		Name:    r.Name,
		Gender:  gender,
		BreedID: uint(r.BreedID),
		Color:   r.Color,
		Weight:  r.Weight,
	}
	id, err := h.repo.Create(pet, uint(claims.UserId))
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	return c.JSON(201, echo.Map{
		"id": id,
	})
}

// users.GET("/pet", h.user.createPetGet)
func (h *petHandler) createPetGet(c echo.Context) error {
	//types, breed
	t, err := h.repo.GetTypes()
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	typ := newTypeBreedResponse(t)
	return c.JSON(200, echo.Map{
		"types": typ,
	})
}

// users.Put("/pet/:petID", h.user.updatePet)
func (h *petHandler) updatePet(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	petID, err := strconv.Atoi(c.Param("petID"))
	if err != nil {
		return c.JSON(400, echo.Map{"error": "Invalid pet ID"})
	}

	var r petRequest
	if err := c.Bind(&r); err != nil {
		return c.JSON(400, echo.Map{"error": "Bad request"})
	}

	if err := c.Validate(r); err != nil {
		return c.JSON(400, echo.Map{
			"error":  "Validation failed",
			"fields": validator.GetValidationErrors(err),
		})
	}

	if owner, _ := h.repo.CheckPetOwnership(uint(petID), uint(claims.UserId)); !owner {
		return c.JSON(403, echo.Map{"error": "You don't own this pet"})
	}

	var gender model.Gender
	if r.Gender == "ж" {
		gender = model.Female
	} else {
		gender = model.Male
	}
	pet := &model.Pet{
		Model:   gorm.Model{ID: uint(petID)},
		Name:    r.Name,
		Gender:  gender,
		BreedID: uint(r.BreedID),
		Color:   r.Color,
		Weight:  r.Weight,
	}

	if err := h.repo.Update(pet); err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	return c.JSON(200, echo.Map{
		"message": "Pet updated successfully",
		"pet_id":  pet.ID,
	})
}

// users.DELETE("/pet/:petID", h.user.unactivePet)
func (h *petHandler) deactivatePet(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	petID, err := strconv.Atoi(c.Param("petID"))
	if err != nil {
		return c.JSON(400, echo.Map{"error": "Invalid pet ID"})
	}

	if owner, _ := h.repo.CheckPetOwnership(uint(petID), uint(claims.UserId)); !owner {
		return c.JSON(403, echo.Map{"error": "You don't own this pet"})
	}

	err = h.repo.Deactivate(uint(petID))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.JSON(404, echo.Map{
				"error": "Pet not found",
			})
		}
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "Pet deactivated successfully",
	})
}

func (h *petHandler) getAllPets(c echo.Context) error {
	claims, err := auth.GetClaims(c)
	if err != nil {
		if httpErr, ok := err.(*echo.HTTPError); ok {
			return httpErr
		}
		return echo.NewHTTPError(401, "Invalid authentication")
	}

	pets, err := h.repo.GetAllByUserID(uint(claims.UserId))
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
	u := newAllPetsResponce(pets)
	return c.JSON(200, u)
}
