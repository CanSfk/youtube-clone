package service

import (
	"youtube-clone/modules/auth/password"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IAuthService interface {
	CreateUser(userCreateDto dto.CreateUserDto) dto.ResponseUserDto
	Login(dto.LoginUserDto) bool
}

type AuthService struct {
	userRepository repository.IUserRepository
}

func NewAuthService(userRepository repository.IUserRepository) IAuthService {
	return &AuthService{
		userRepository: userRepository,
	}
}

func (a *AuthService) CreateUser(userCreateDto dto.CreateUserDto) dto.ResponseUserDto {
	hashedPassword, _ := password.HashPassword(userCreateDto.Password)
	userCreateDto.Password = hashedPassword

	return a.userRepository.CreateUser(userCreateDto)
}

func (a *AuthService) Login(loginUserDto dto.LoginUserDto) bool {
	user := a.userRepository.GetUserByUserName(loginUserDto.UserName)

	return password.ComparePasswords(user.Password, []byte(loginUserDto.Password))
}
