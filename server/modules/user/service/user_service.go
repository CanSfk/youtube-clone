package service

import (
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserService interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) (dto.ResponseUserDto, error)
	CreateUser(dto.CreateUserDto) dto.ResponseUserDto
	GetAllUsersWithVideos() []dto.UsersWithVideosResponse
}

type UserService struct {
	userRepository repository.IUserRepository
}

func NewUserService(userRepository repository.IUserRepository) IUserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (u *UserService) GetAllUsers() []dto.ResponseUserDto {
	return u.userRepository.GetAllUsers()
}

func (u *UserService) GetUserById(id int) (dto.ResponseUserDto, error) {
	return u.userRepository.GetUserById(id)
}

func (u *UserService) CreateUser(createUserDto dto.CreateUserDto) dto.ResponseUserDto {
	user := u.userRepository.CreateUser(createUserDto)

	return user
}

func (u *UserService) GetAllUsersWithVideos() []dto.UsersWithVideosResponse {
	return u.userRepository.GetAllUsersWithVideos()
}
