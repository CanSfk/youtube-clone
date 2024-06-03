package repository

import (
	"fmt"
	"log"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/model/dto"
)

type IVideoRepository interface {
	GetAllVideos() []dto.VideoResponseDto
	GetAllVideosWithUser() []dto.VideoWithUserResponseDto
	CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoWithUserResponseDto
}

type videoRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewVideoRepository(baseCrudRepository repositories.IBaseCrudRepository) IVideoRepository {
	return &videoRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (vr *videoRepository) GetAllVideos() []dto.VideoResponseDto {
	var videos []dto.VideoResponseDto
	var video dto.VideoResponseDto

	rows, _ := vr.baseCrudRepository.GetAll("video_url", "video_title", "video_description")

	for rows.Next() {
		rows.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoDescription)

		videos = append(videos, video)
	}

	return videos
}

func (vr *videoRepository) GetAllVideosWithUser() []dto.VideoWithUserResponseDto {
	videos := []dto.VideoWithUserResponseDto{}
	video := dto.VideoWithUserResponseDto{}

	query := `SELECT 
	v.video_url, v.video_title, v.video_cover_image_name,
	u.user_name
	FROM Videos v 
	INNER JOIN Users u
	ON v.user_id = u.id`

	rows, _ := vr.baseCrudRepository.GetAllCustomQuery(query)

	defer rows.Close()

	for rows.Next() {

		err := rows.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoCoverImageName, &video.UserName)
		if err != nil {
			log.Fatalf("Error row scan: %s", err)
		}

		videos = append(videos, video)
	}

	return videos
}

func (vr *videoRepository) CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoWithUserResponseDto {
	var video dto.VideoWithUserResponseDto

	createData := map[string]interface{}{
		"video_url":              videoCreateDto.VideoUrl,
		"video_cover_image_name": videoCreateDto.VideoCoverImageName,
		"video_title":            videoCreateDto.VideoTitle,
		"video_description":      videoCreateDto.VideoDescription,
		"user_id":                videoCreateDto.UserId,
	}

	row, _ := vr.baseCrudRepository.Create(createData)

	lastInsertId, err := row.LastInsertId()
	if err != nil {
		log.Fatalf("Last insert id error: %s", err)
	}

	getByIdRowVideo, _ := vr.baseCrudRepository.GetCustomQuery(fmt.Sprintf(`SELECT 
	v.video_url, v.video_title, v.video_cover_image_name,
	u.user_name
	FROM Videos v 
	INNER JOIN Users u
	ON v.user_id= u.id
	Where v.id = ('%d')`, int(lastInsertId)))

	getByIdRowVideo.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoCoverImageName, &video.UserName)

	return video
}
