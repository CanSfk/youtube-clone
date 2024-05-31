package dto

type ResponseUserDto struct {
	FullName string `json:"full_name" db:"full_name"`
	UserName string `json:"userName" db:"user_name"`
}
