package dto

type CreateUserDto struct {
	FullName string `json:"full_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
}
