package service

import (
	"youtube-clone/modules/user/model"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserService interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) model.User
	CreateUser(dto.CreateUserDto) model.User
}

type UserService struct {
	userRepository repository.IUserRepository
}

func NewUserService(userRepository repository.IUserRepository) IUserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (p *UserService) GetAllUsers() []dto.ResponseUserDto {
	return p.userRepository.GetAllUsers()
}

func (p *UserService) GetUserById(id int) model.User {
	return p.userRepository.GetUserById(id)
}

func (p *UserService) CreateUser(createUserDto dto.CreateUserDto) model.User {
	user := p.userRepository.CreateUser(createUserDto)

	return user
}
