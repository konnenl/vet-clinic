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
