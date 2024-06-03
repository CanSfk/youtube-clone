package repository

import (
	"database/sql"
	"fmt"
	"log"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/model/dto"
	dtoVideo "youtube-clone/modules/video/model/dto"
)

type IUserRepository interface {
	GetAllUsers() []dto.ResponseUserDto
	GetUserById(id int) (dto.ResponseUserDto, error)
	CreateUser(createUser dto.CreateUserDto) dto.ResponseUserDto
	GetAllUsersWithVideos() []dto.UsersWithVideosResponse
	GetUserByUserName(userName string) dto.ResponseUserDtoWithPassport
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

func (r *UserRepository) GetAllUsersWithVideos() []dto.UsersWithVideosResponse {
	users := []dto.UsersWithVideosResponse{}
	userMap := make(map[string]*dto.UsersWithVideosResponse)

	query := `SELECT 
	u.full_name, u.user_name,
	v.video_url, v.video_title, v.video_description 
	FROM Users u 
	LEFT JOIN Videos v 
	ON u.id= v.user_id`

	rows, _ := r.baseCrudRepository.GetAllCustomQuery(query)

	defer rows.Close()

	for rows.Next() {
		var fullName, userName, videoUrl, videoTitle, videoDescription sql.NullString

		err := rows.Scan(&fullName, &userName, &videoUrl, &videoTitle, &videoDescription)
		if err != nil {
			log.Fatalf("Error row scan: %s", err)
		}

		user, ok := userMap[userName.String]

		if !ok {
			user := dto.UsersWithVideosResponse{
				FullName: fullName.String,
				UserName: userName.String,
				Videos:   []dtoVideo.VideoResponseDto{},
			}

			if videoUrl.String != "" {
				user.Videos = append(user.Videos, dtoVideo.VideoResponseDto{
					VideoUrl:         videoUrl.String,
					VideoTitle:       videoTitle.String,
					VideoDescription: videoDescription.String,
				})
			}

			userMap[userName.String] = &user
		} else {
			if videoUrl.String != "" {
				user.Videos = append(user.Videos, dtoVideo.VideoResponseDto{
					VideoUrl:         videoUrl.String,
					VideoTitle:       videoTitle.String,
					VideoDescription: videoDescription.String,
				})
			}
		}
	}

	for _, value := range userMap {
		users = append(users, *value)
	}

	return users
}

func (u *UserRepository) GetUserByUserName(userName string) dto.ResponseUserDtoWithPassport {
	var user dto.ResponseUserDtoWithPassport

	row, _ := u.baseCrudRepository.GetCustomQuery(fmt.Sprintf("Select full_name, user_name, password FROM Users Where user_name = ('%s')", userName))

	row.Scan(&user.FullName, &user.UserName, &user.Password)

	return user
}
