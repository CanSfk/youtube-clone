package service

import (
	"youtube-clone/modules/auth/password"
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserService interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) (dto.ResponseUserDto, error)
	CreateUser(dto.CreateUserDto) dto.ResponseUserDto
	GetAllUsersWithVideos() []dto.UsersWithVideosResponse
	LoginUser(dto.LoginUserDto) bool
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
	hashedPassword, _ := password.HashPassword(createUserDto.Password)
	createUserDto.Password = hashedPassword

	return u.userRepository.CreateUser(createUserDto)
}

func (u *UserService) GetAllUsersWithVideos() []dto.UsersWithVideosResponse {
	return u.userRepository.GetAllUsersWithVideos()
}

func (u *UserService) LoginUser(loginUserDto dto.LoginUserDto) bool {
	user := u.userRepository.GetUserByUserName(loginUserDto.UserName)

	return password.ComparePasswords(user.Password, []byte(loginUserDto.Password))
}
