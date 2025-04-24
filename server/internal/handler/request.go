package handler

type userRegisterRequest struct {
	Name string `json:"name" validate:"required"`
	Surname string `json:"surname" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type userUpdateRequest struct{
	Name string `json:"name" validate:"required"`
	Surname string `json:"surname" validate:"required"`
	Patronymic string `json:"patronymic"`
	Email    string `json:"email" validate:"required,email"`
	PhoneNumber string `json:"phone_number"`
}

type userLoginRequest struct{
	Email string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}