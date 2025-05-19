package handler

type userRegisterRequest struct {
	Name     string `json:"name" validate:"required"`
	Surname  string `json:"surname" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type userUpdateRequest struct {
	Name        string `json:"name" validate:"required"`
	Surname     string `json:"surname" validate:"required"`
	Patronymic  string `json:"patronymic"`
	Email       string `json:"email" validate:"required,email"`
	PhoneNumber string `json:"phone_number" validate:"required,phone"`
	Address     string `json"address"`
}

type userLoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

type petRequest struct {
	Name    string `json:"name" validate:"required"`
	Gender  string `json:"gender" validate:"required,gender"`
	BreedID int    `json:"breed_id" validate:"required"`
	Color   string `json:"color" validate:"required"`
	Weight  uint   `json:"weight" validate:"required,gt=0"`
}
