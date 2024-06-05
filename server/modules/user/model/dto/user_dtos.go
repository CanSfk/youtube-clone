package dto

import "youtube-clone/modules/video/model/dto"

type CreateUserDto struct {
	FullName         string `json:"full_name"`
	UserName         string `json:"user_name"`
	Password         string `json:"password"`
	ProfileImageName string `json:"profile_image_name"`
}

type ResponseUserDtoWithId struct {
	Id               int    `json:"user_id" db:"id"`
	FullName         string `json:"full_name" db:"full_name"`
	UserName         string `json:"user_name" db:"user_name"`
	ProfileImageName string `json:"profile_image_name" db:"profile_image_name"`
}

type ResponseUserDto struct {
	FullName string `json:"full_name" db:"full_name"`
	UserName string `json:"user_name" db:"user_name"`
}

type ResponseUserLoginDto struct {
	Id               int    `json:"user_id" db:"id"`
	FullName         string `json:"full_name" db:"full_name"`
	UserName         string `json:"user_name" db:"user_name"`
	Password         string `json:"password" db:"password"`
	ProfileImageName string `json:"profile_image_name" db:"profile_image_name"`
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
