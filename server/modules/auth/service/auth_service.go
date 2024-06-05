package service

import (
	"youtube-clone/modules/auth/password"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IAuthService interface {
	CreateUser(userCreateDto dto.CreateUserDto) dto.ResponseUserDtoWithId
	Login(dto.LoginUserDto) (dto.ResponseUserDtoWithId, bool)
}

type AuthService struct {
	userRepository repository.IUserRepository
}

func NewAuthService(userRepository repository.IUserRepository) IAuthService {
	return &AuthService{
		userRepository: userRepository,
	}
}

func (a *AuthService) CreateUser(userCreateDto dto.CreateUserDto) dto.ResponseUserDtoWithId {
	hashedPassword, _ := password.HashPassword(userCreateDto.Password)
	userCreateDto.Password = hashedPassword

	return a.userRepository.CreateUser(userCreateDto)
}

func (a *AuthService) Login(loginUserDto dto.LoginUserDto) (dto.ResponseUserDtoWithId, bool) {
	user := a.userRepository.GetUserByUserName(loginUserDto.UserName)

	passwordConfirmed := password.ComparePasswords(user.Password, []byte(loginUserDto.Password))

	if !passwordConfirmed {
		return dto.ResponseUserDtoWithId{}, false
	}

	return dto.ResponseUserDtoWithId{Id: user.Id, UserName: user.UserName, FullName: user.FullName, ProfileImageName: user.ProfileImageName}, true
}
