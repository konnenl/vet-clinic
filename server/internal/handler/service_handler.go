package handler

import (
	"github.com/konnenl/vet-clinic/internal/repository"
	"github.com/labstack/echo/v4"
)

type serviceHandler struct {
	repo repository.ServiceRepository
}

func newServiceHandler(repo repository.ServiceRepository) *serviceHandler {
	return &serviceHandler{
		repo: repo,
	}
}

func (h *serviceHandler) getAllServices(c echo.Context) error {
	categories, err := h.repo.GetAll()
	if err != nil {
		return c.JSON(500, echo.Map{
			"error": "Internal error",
		})
	}
	cats := newCategoryServicesResponse(categories)
	return c.JSON(200, echo.Map{
		"services": cats,
	})
}
