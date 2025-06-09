package handler

import (
	"github.com/labstack/echo/v4"
	_ "gorm.io/gorm"
	"net/http"

	_ "github.com/konnenl/vet-clinic/internal/auth"
	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
	_ "github.com/konnenl/vet-clinic/internal/validator"
)

type visitHandler struct {
	repo repository.VisitRepository
}

func newVisitHandler(repo repository.VisitRepository) *visitHandler {
	return &visitHandler{
		repo: repo,
	}
}

// visit.POST("", h.visit.createPost)
func (h *visitHandler) createVisit(c echo.Context) error {
	var r visitRequest
	if err := c.Bind(&r); err != nil {
		return c.JSON(400, echo.Map{
			"error": "Bad request",
		})
	}

	visitServices := make([]model.VisitServices, len(r.Services))
	for i, service := range r.Services {
		visitServices[i] = model.VisitServices{
			ServiceID: service.ID,
		}
	}

	visit := model.Visit{
		PetID:         r.PetID,
		VisitDate:     r.DateTime,
		Type:          r.Type,
		Status:        "Запланировано",
		Cost:          0,
		VisitServices: visitServices,
	}

	visitID, err := h.repo.Create(&visit)
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message":  "Visit created successfully",
		"visit_id": visitID,
	})
}

// visit.GET("/:visitID", h.visit.getByID)
// visit.GET("/data", h.visit.createGet)
// visit.GET("", h.visit.getAll)
// func (h *visitHandler) getAllVisits(c echo.Context) error {
// }
