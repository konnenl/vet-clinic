package handler

import (
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strings"
	"gorm.io/datatypes"

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

// users.POST("/pet", h.user.createPet)
func (h *authHandler) createPet(c echo.Context) error {
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
	if r.Gender == "ж"{
		gender = model.Female
	}else{
		gender = model.Male
	}

	notes, err := json.Marshal(r.Notes)
	if err != nil{
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	pet := &model.Pet{
		Name:     r.Name,
		Gender:  gender,
		BreedID: r.Breed,
		Color: r.Color,
		Weight: r.Weight,
		Notes: datatypes.JSON(notes)
	}
	id, err := h.repo.Create(pet)
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	return c.JSON(201, echo.Map{
		"id": id,
	})
}

// users.Put("/pet", h.user.updatePet)
// users.DELETE("/pet", h.user.unactivePet)