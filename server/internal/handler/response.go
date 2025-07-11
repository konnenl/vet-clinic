package handler

import (
	"github.com/konnenl/vet-clinic/internal/model"
	"time"
)

type clientResponse struct {
	Email       string        `json:"email"`
	PhoneNumber string        `json:"phone_number"`
	Name        string        `json:"name"`
	Surname     string        `json:"surname"`
	Patronymic  string        `json:"patronymic"`
	Address     string        `json:"address"`
	Pets        []petResponse `json:"pets"`
}

type petResponse struct {
	ID               uint   `json:"id"`
	Name             string `json:"name"`
	Gender           string `json:"gender"`
	TypeID           uint   `json:"type_id"`
	Type             string `json:"type"`
	BreedID          uint   `json:"breed_id"`
	Breed            string `json:"breed"`
	RegistrationDate string `json:"registration_date"`
	Color            string `json:"color"`
	Weight           uint   `json:"weight"`
}

func newClientPetResponse(c *model.Client) clientResponse {
	pets := make([]petResponse, len(c.Pets))
	for j, pet := range c.Pets {
		var g string
		if pet.Gender == model.Female {
			g = "ж"
		} else {
			g = "м"
		}
		petResponse := petResponse{
			ID:               pet.ID,
			Name:             pet.Name,
			Gender:           g,
			BreedID:          pet.BreedID,
			Breed:            pet.Breed.Name,
			TypeID:           pet.Breed.TypeID,
			Type:             pet.Breed.Type.Name,
			RegistrationDate: pet.RegistrationDate.Format("2006-01-02"),
			Color:            pet.Color,
			Weight:           pet.Weight,
		}
		pets[j] = petResponse
	}
	r := clientResponse{
		Email:       c.User.Email,
		PhoneNumber: c.User.PhoneNumber,
		Name:        c.User.Name,
		Surname:     c.User.Surname,
		Patronymic:  c.User.Patronymic,
		Address:     c.Address,
		Pets:        pets,
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

type petResponce struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

func newAllPetsResponce(p []model.Pet) []petResponce {
	pets := make([]petResponce, len(p))
	for i, pet := range p {
		pets[i] = petResponce{
			ID:   pet.ID,
			Name: pet.Name,
		}
	}
	return pets
}

type visitResponce struct {
	ID       uint              `json:"visit_id"`
	DateTime time.Time         `json:"datetime"`
	Status   string            `json:"status"`
	Type     string            `json:"type"`
	Cost     float64           `json:"cost"`
	Services []serviceResponse `json:"services"`
}

type petVisitResponce struct {
	PetID  uint            `json:"pet_id"`
	Name   string          `json:"name"`
	Visits []visitResponce `json:"visits"`
}

func newPetsVisitsResponce(p []model.Pet) []petVisitResponce {
	petsVisits := make([]petVisitResponce, len(p))
	for i, pet := range p {
		visits := make([]visitResponce, len(pet.Visits))
		for j, visit := range pet.Visits {
			services := make([]serviceResponse, len(visit.VisitServices))
			for k, service := range visit.VisitServices {
				services[k] = serviceResponse{
					ID:    service.Service.ID,
					Name:  service.Service.Name,
					Price: service.Service.Price,
				}
			}
			visits[j] = visitResponce{
				ID:       visit.ID,
				DateTime: visit.VisitDate,
				Status:   visit.Status,
				Cost:     visit.Cost,
				Services: services,
			}
		}
		petsVisits[i] = petVisitResponce{
			PetID:  pet.ID,
			Name:   pet.Name,
			Visits: visits,
		}
	}
	return petsVisits
}
