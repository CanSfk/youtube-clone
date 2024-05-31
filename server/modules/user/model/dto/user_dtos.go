package dto

type CreateUserDto struct {
	FullName string `json:"full_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

type ResponseUserDto struct {
	FullName string `json:"full_name" db:"full_name"`
	UserName string `json:"user_name" db:"user_name"`
}
