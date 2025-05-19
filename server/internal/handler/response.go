package handler

import (
	"github.com/konnenl/vet-clinic/internal/model"
)

type clientResponse struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Patronymic  string `json:"patronymic"`
	Address     string `json:"address"`
}

func newClientResponse(c *model.Client) clientResponse {
	r := clientResponse{
		Email:       c.User.Email,
		PhoneNumber: c.User.PhoneNumber,
		Name:        c.User.Name,
		Surname:     c.User.Surname,
		Patronymic:  c.User.Patronymic,
		Address:     c.Address,
	}
	return r
}

type serviceResponse struct {
	ID    uint    `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type categoryResponse struct {
	Name     string            `json:"name"`
	Services []serviceResponse `json:"services"`
}

func newCategoryServicesResponse(c []*model.Category) []categoryResponse {
	categories := make([]categoryResponse, len(c))
	for i, category := range c {
		services := make([]serviceResponse, len(category.Services))
		for j, service := range category.Services {
			serviceResponse := serviceResponse{
				ID:    service.ID,
				Name:  service.Name,
				Price: service.Price,
			}
			services[j] = serviceResponse
		}
		categoryResponse := categoryResponse{
			Name:     category.Name,
			Services: services,
		}
		categories[i] = categoryResponse
	}

	return categories
}

type typeResponse struct {
	Name   string          `json:"name"`
	Breeds []breedResponse `json:"breeds"`
}

type breedResponse struct {
	ID   uint   `json"id"`
	Name string `json:"name"`
}

func newTypeBreedResponse(t []*model.Type) []typeResponse {
	types := make([]typeResponse, len(t))
	for i, typ := range t {
		breeds := make([]breedResponse, len(typ.Breeds))
		for j, breed := range typ.Breeds {
			breedResponse := breedResponse{
				ID:   breed.ID,
				Name: breed.Name,
			}
			breeds[j] = breedResponse
		}
		typeResponse := typeResponse{
			Name:   typ.Name,
			Breeds: breeds,
		}
		types[i] = typeResponse
	}

	return types
}
