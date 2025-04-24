package handler

import(
	"net/http"
	"github.com/labstack/echo/v4"
	"strconv"
	"gorm.io/gorm"

	"github.com/konnenl/vet-clinic/internal/model"
	"github.com/konnenl/vet-clinic/internal/repository"
)

type UserHandler struct{
	UserRepository *repository.UserRepository
}

func NewUserHandler(userRepository *repository.UserRepository) *UserHandler {
	return &UserHandler{
		UserRepository: userRepository,
	}
}

//TODO not found везде

//e.POST("/auth/login", saveUser)
func (h *UserHandler) Login(c echo.Context) error{
	var u userLoginRequest
	if err := c.Bind(&u); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	if err := c.Validate(u); err != nil{
		return err
	}
	//user, err := h.UserRepository.GetByEmail(u.Email)

	return c.JSON(http.StatusOK, "/login")
}

//e.POST("/user", CreateUser)
func (h *UserHandler) CreateUser(c echo.Context) error {
	var u userRegisterRequest
	if err := c.Bind(&u); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	if err := c.Validate(u); err != nil{
		return err
	}

	//TODO вынести в func bind request
	var user model.User
	hashedPassword, err := user.HashPassword(u.Password)
	if err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	user.Name = u.Name
	user.Surname = u.Surname
	user.Email = u.Email
	user.Password = hashedPassword
	user.Role = "client"

	if err := h.UserRepository.Create(&user); err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to create user",
		})
	}
	return c.JSON(http.StatusCreated, u)
}

//e.GET("/user", GetUserByID)
func (h *UserHandler) GetUserByID(c echo.Context) error{
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	user, err := h.UserRepository.GetByID(id)
	if err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to get user",
		})
	}
	u := newUserResponse(user)
	return c.JSON(http.StatusOK, u)
}

//TODO id через токен
//e.POST("/users/:id", userHandler.UpdateUser)
func (h * UserHandler) UpdateUser(c echo.Context) error{
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	var u userUpdateRequest
	if err := c.Bind(&u); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	if err := c.Validate(u); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	var user model.User
	if err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	user.ID = uint(id)
	user.Name = u.Name
	user.Surname = u.Surname
	user.Patronymic = u.Patronymic
	user.Email = u.Email
	user.PhoneNumber = u.PhoneNumber

	if err := h.UserRepository.Update(&user); err != nil{
        if err == gorm.ErrRecordNotFound {
            return c.JSON(http.StatusNotFound, echo.Map{
                "error": "User not found",
            })
        }
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to update user",
		})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"message": "User updated successfully",
	})
}

//e.DELETE("/users/:id", userHandler.DeleteUser)
func(h *UserHandler) UnactiveUser(c echo.Context) error{
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	//TODO id from token, проверка прав на удаление
	//TODO вынести ошибки, убрать использование gorm
	err = h.UserRepository.Unactive(id)
	if err != nil{
        if err == gorm.ErrRecordNotFound {
            return c.JSON(http.StatusNotFound, echo.Map{
                "error": "User not found",
            })
        }
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to delete user",
		})
	}
	return c.JSON(http.StatusOK, echo.Map{
		"message": "User deactivated successfully",
	})
}