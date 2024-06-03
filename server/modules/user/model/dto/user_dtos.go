package dto

import "youtube-clone/modules/video/model/dto"

type CreateUserDto struct {
	FullName string `json:"full_name"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
}

type ResponseUserDto struct {
	FullName string `json:"full_name" db:"full_name"`
	UserName string `json:"user_name" db:"user_name"`
}

type ResponseUserDtoWithPassport struct {
	FullName string `json:"full_name" db:"full_name"`
	UserName string `json:"user_name" db:"user_name"`
	Password string `json:"password" db:"password"`
}

type UsersWithVideosResponse struct {
	FullName string                 `json:"full_name"`
	UserName string                 `json:"user_name"`
	Videos   []dto.VideoResponseDto `json:"videos"`
}

type LoginUserDto struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}
