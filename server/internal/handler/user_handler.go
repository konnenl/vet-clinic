package handler

import(
	"net/http"
	"github.com/labstack/echo/v4"
	"strconv"

	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
)

type UserHandler struct{
	UserRepo *repository.UserRepository
}

func NewUserHandler(userRepo *repository.UserRepository) *UserHandler {
	return &UserHandler{
		UserRepo: userRepo,
	}
}

func (h *UserHandler) Login(c echo.Context) error{
	return c.JSON(http.StatusOK, "/login")
}

//e.POST("/user", saveUser)
func (h *UserHandler) CreateUser(c echo.Context) error {
	var u userRegisterRequest
	if err := c.Bind(&u); err != nil{
		return c.String(http.StatusBadRequest, "bad request")
	}

	//TODO валидация
	//TODO вынести в func bind request
	var user model.User
	hashedPassword, err := user.HashPassword(u.Password)
	if err != nil{
		return c.String(http.StatusBadRequest, "bad request")
	}
	user.Name = u.Name
	user.Surname = u.Surname
	user.Email = u.Email
	user.Password = hashedPassword
	user.Role = "client"

	if err := h.UserRepo.Create(&user); err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to create user"})
	}
	return c.JSON(http.StatusOK, u)
}

//e.GET("/user", getUserByID)
func (h *UserHandler) GetUserByID(c echo.Context) error{
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	user, err := h.UserRepo.GetByID(id)
	if err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to get user",
		})
	}
	u := newUserResponse(user)
	return c.JSON(http.StatusOK, u)
}