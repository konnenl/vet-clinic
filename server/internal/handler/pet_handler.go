package handler

import (
	"github.com/labstack/echo/v4"

	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/konnenl/vet-clinic/internal/validator"
	"github.com/konnenl/vet-clinic/internal/auth"

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

// users.Put("/pet", h.user.updatePet)
// users.DELETE("/pet", h.user.unactivePet)
