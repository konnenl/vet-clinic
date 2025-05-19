package handler

import (
	"github.com/konnenl/vet-clinic/internal/model"
)

type userResponse struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Patronymic  string `json:"patronymic"`
}

func newUserResponse(u *model.User) userResponse {
	r := userResponse{
		Email:       u.Email,
		PhoneNumber: u.PhoneNumber,
		Name:        u.Name,
		Surname:     u.Surname,
		Patronymic:  u.Patronymic,
	}
	return r
}

type serviceResponse struct {
	ID uint `json:"id"`
	Name string `json:"name"`
	Price float64 `json:"price"`
}

type categoryResponse struct {
	Name string `json:"name"`
	Services []serviceResponse `json:"services"`
}

func newCategoryServicesResponse(c []*model.Category) []categoryResponse{
	categories := make([]categoryResponse, len(c))
	for i, category := range c{
		services := make([]serviceResponse, len(category.Services))
		for j, service := range category.Services{
			serviceResponse := serviceResponse{
				ID: service.ID,
				Name: service.Name, 
				Price: service.Price,
			}
			services[j] = serviceResponse
		}
		categoryResponse := categoryResponse{
			Name: category.Name, 
			Services: services,
		}
		categories[i] = categoryResponse
	}

	return categories
}