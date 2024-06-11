package repository

import (
	"fmt"
	"log"
	"time"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/model/dto"
)

type IVideoRepository interface {
	GetAllVideos() []dto.VideoResponseDto
	GetAllVideosWithUser() []dto.VideoWithUserResponseDto
	CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoWithUserResponseDto
	GetVideoByName(videoName string) (dto.VideoShowResponseDto, []dto.VideoCommentReponseDto, error)
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
	created_at := time.Time{}

	query := `SELECT 
	v.video_url, v.video_title, v.video_cover_image_name, v.created_at,
	u.user_name, u.profile_image_name
	FROM videos v 
	INNER JOIN users u
	ON v.user_id = u.id`

	rows, _ := vr.baseCrudRepository.GetAllCustomQuery(query)

	defer rows.Close()

	for rows.Next() {

		err := rows.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoCoverImageName, &created_at, &video.UserName, &video.ProfileImageName)
		if err != nil {
			log.Fatalf("Error row scan: %s", err)
		}

		timeDif := time.Since(created_at)

		video.TimeDif = int(timeDif.Minutes())

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
		"video_view_count":       videoCreateDto.VideoViewCount,
		"user_id":                videoCreateDto.UserId,
	}

	row, _ := vr.baseCrudRepository.Create(createData)

	lastInsertId, err := row.LastInsertId()
	if err != nil {
		log.Fatalf("Last insert id error: %s", err)
	}

	getByIdRowVideo, _ := vr.baseCrudRepository.GetCustomQuery(fmt.Sprintf(`SELECT 
	v.video_url, v.video_title, v.video_cover_image_name,
	u.user_name, u.profile_image_name
	FROM videos v 
	INNER JOIN users u
	ON v.user_id = u.id
	Where v.id = ('%d')`, int(lastInsertId)))

	getByIdRowVideo.Scan(&video.VideoUrl, &video.VideoTitle, &video.VideoCoverImageName, &video.UserName, &video.ProfileImageName)

	return video
}

func (vr *videoRepository) GetVideoByName(videoName string) (dto.VideoShowResponseDto, []dto.VideoCommentReponseDto, error) {
	video := dto.VideoShowResponseDto{}
	comment := dto.VideoCommentReponseDto{}
	comments := []dto.VideoCommentReponseDto{}
	created_at := time.Time{}

	getByIdRowVideo, err := vr.baseCrudRepository.GetCustomQuery(fmt.Sprintf(`SELECT 
	v.id, v.video_url, v.video_title, v.video_description, v.video_cover_image_name, v.user_id,
	u.user_name, u.profile_image_name
	FROM videos v 
	INNER JOIN users u
	ON v.user_id = u.id
	Where v.video_url = ('%s')`, videoName))

	if err != nil {
		return video, nil, err
	}

	scanErr := getByIdRowVideo.Scan(&video.VideoId, &video.VideoUrl, &video.VideoTitle, &video.VideoDescription, &video.VideoCoverImageName, &video.UserId, &video.UserName, &video.ProfileImageName)
	if scanErr != nil {
		return video, nil, scanErr
	}

	getVideoCommentsRows, err := vr.baseCrudRepository.GetAllCustomQuery(fmt.Sprintf(`SELECT
	c.comment,c.created_at, u.user_name, u.profile_image_name FROM video_comments c 
	INNER JOIN users u ON c.user_id = u.id
	WHERE c.video_id = %d
	`, video.VideoId))
	if err != nil {
		return video, nil, err
	}

	for getVideoCommentsRows.Next() {
		err := getVideoCommentsRows.Scan(&comment.Comment, &created_at, &comment.UserName, &comment.AccountImageName)
		if err != nil {
			return video, nil, err
		}

		timeDif := time.Since(created_at)

		comment.TimeDif = int(timeDif.Minutes())

		comments = append(comments, comment)
	}

	defer getVideoCommentsRows.Close()

	return video, comments, nil
}
