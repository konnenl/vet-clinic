package handler

type userRegisterRequest struct {
	Name string `json:"name" validate:"required,notblank"`
	Surname string `json:"surname" validate:"required,notblank"`
	Email    string `json:"email" validate:"required,email,notblank"`
	Password string `json:"password" validate:"required,notblank,min=8"`
}
