package repository

import (
	"database/sql"
	"log"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/model/dto"
)

type IUserRepository interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) (dto.ResponseUserDto, error)
	CreateUser(createUser dto.CreateUserDto) dto.ResponseUserDto
}

type UserRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewUserRepository(baseCrudRepository repositories.IBaseCrudRepository) IUserRepository {
	return &UserRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (r *UserRepository) GetAllUsers() []dto.ResponseUserDto {
	var users []dto.ResponseUserDto
	var user dto.ResponseUserDto

	rows, _ := r.baseCrudRepository.GetAll("full_name", "user_name")

	for rows.Next() {
		rows.Scan(&user.FullName, &user.UserName)

		users = append(users, user)
	}

	defer rows.Close()

	return users
}

func (r *UserRepository) GetUserById(id int) (dto.ResponseUserDto, error) {
	var user dto.ResponseUserDto

	row, _ := r.baseCrudRepository.GetById(id, "full_name", "user_name")

	err := row.Scan(&user.FullName, &user.UserName)

	if err == sql.ErrNoRows {
		return user, err
	}

	return user, nil
}

func (r *UserRepository) CreateUser(createUserDto dto.CreateUserDto) dto.ResponseUserDto {
	var user dto.ResponseUserDto

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

	getByIdRow, _ := r.baseCrudRepository.GetById(int(lastInsertId), "full_name", "user_name")

	getByIdRow.Scan(&user.FullName, &user.UserName)

	return user
}
