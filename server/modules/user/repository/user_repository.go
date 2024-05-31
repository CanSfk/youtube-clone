package repository

import (
	"log"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/model"
	"youtube-clone/modules/user/model/dto"
)

type IUserRepository interface {
	GetAllUsers() []model.User
	GetUserById(id int) model.User
	CreateUser(createUser dto.CreateUserDto) model.User
}

type UserRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewUserRepository(baseCrudRepository repositories.IBaseCrudRepository) IUserRepository {
	return &UserRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (r *UserRepository) GetAllUsers() []model.User {
	var users []model.User
	var user model.User

	rows, _ := r.baseCrudRepository.GetAll("id", "full_name", "user_name", "password")

	for rows.Next() {
		rows.Scan(user.Id, user.FullName, user.UserName, user.Password)

		users = append(users, user)
	}

	defer rows.Close()

	return users
}

func (r *UserRepository) GetUserById(id int) model.User {
	var user model.User

	row, _ := r.baseCrudRepository.GetById(id, "id", "full_name", "user_name", "password")

	row.Scan(&user.Id, &user.FullName, &user.UserName, &user.Password)

	return user
}

func (r *UserRepository) CreateUser(createUserDto dto.CreateUserDto) model.User {
	var user model.User

	userDataMap := map[string]interface{}{
		"full_name": createUserDto.FullName,
		"user_name": createUserDto.UserName,
		"password":  createUserDto.Password,
	}

	createRow, _ := r.baseCrudRepository.Create(userDataMap)

	lastInsertId, err := createRow.LastInsertId()
	if err != nil {
		log.Fatalf("Last insert id error: %s", err)
	}

	getByIdRow, _ := r.baseCrudRepository.GetById(int(lastInsertId), "id", "full_name", "user_name", "password")

	getByIdRow.Scan(&user.Id, &user.FullName, &user.UserName, &user.Password)

	return user
}
