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
	repo repository.UserRepository
}

func NewUserHandler(repo repository.UserRepository) *UserHandler{
	return &UserHandler{repo: repo}
}

//TODO not found везде
//TODO errors

//POST("/sign-up", signUp)
func (h *UserHandler) signUp(c echo.Context) error {
	var r userRegisterRequest
	if err := c.Bind(&r); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}

	if err := c.Validate(r); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}

	//TODO вынести в func bind request
	hashedPassword, err := model.HashPassword(r.Password)
	if err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	user := &model.User{
		Name: r.Name,
		Surname: r.Surname,
		Email: r.Email,
		Password: hashedPassword,
		Role: "client",
	}

	if err := h.repo.Create(user); err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to create user",
		})
	}
	return c.JSON(http.StatusCreated, r)
}

//POST("/sign-in", signIn)
func (h *UserHandler) signIn(c echo.Context) error{
	var u userLoginRequest
	if err := c.Bind(&u); err != nil{
		return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Bad request",
        })
	}
	if err := c.Validate(u); err != nil{
		return err
	}
	//user, err := h.repo.GetByEmail(u.Email)

	return c.JSON(http.StatusOK, "/login")
}

//GET("/users/:id", getUserByID)
func (h *UserHandler) getUserByID(c echo.Context) error{
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 32)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	user, err := h.repo.GetByID(uint(id))
	if err != nil{
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to get user",
		})
	}
	u := newUserResponse(user)
	return c.JSON(http.StatusOK, u)
}

//TODO id через токен
//PUT("/users/:id", updateUser)
func (h *UserHandler) updateUser(c echo.Context) error{
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 32)
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

	if err := h.repo.Update(&user); err != nil{
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

//DELETE("/users/:id", unactiveUser)
func(h *UserHandler) unactiveUser(c echo.Context) error{
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
    if err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{
            "error": "Invalid ID format",
        })
    }

	//TODO id from token, проверка прав на удаление
	//TODO вынести ошибки, убрать использование gorm
	err = h.repo.Deactivate(uint(id))
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