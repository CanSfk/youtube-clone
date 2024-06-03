package repository

import (
	"log"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/model/dto"
)

type IVideoRepository interface {
	GetAllVideos() []dto.VideoResponseDto
	CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoResponseDto
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

func (vr *videoRepository) CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoResponseDto {
	var video dto.VideoResponseDto

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

	getByIdRow, _ := vr.baseCrudRepository.GetById(int(lastInsertId), "video_url", "video_title", "video_description")

	getByIdRow.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoDescription)

	return video
}
