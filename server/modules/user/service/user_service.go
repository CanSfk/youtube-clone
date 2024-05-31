package service

import (
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserService interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) (dto.ResponseUserDto, error)
	CreateUser(dto.CreateUserDto) dto.ResponseUserDto
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

func (p *UserService) GetUserById(id int) (dto.ResponseUserDto, error) {
	return p.userRepository.GetUserById(id)
}

func (p *UserService) CreateUser(createUserDto dto.CreateUserDto) dto.ResponseUserDto {
	user := p.userRepository.CreateUser(createUserDto)

	return user
}
