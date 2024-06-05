package repository

import (
	"fmt"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/model/dto"
)

type IVideoCommentRepository interface {
	CreateVideoComment(videoCommentCreateDto dto.VideoCommentCreateDto) dto.VideoCommentReponseDto
}

type videoCommentRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewVideoCommentRepository(baseCrudRepository repositories.IBaseCrudRepository) IVideoCommentRepository {
	return &videoCommentRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (vc *videoCommentRepository) CreateVideoComment(videoCommentCreateDto dto.VideoCommentCreateDto) dto.VideoCommentReponseDto {
	var comment dto.VideoCommentReponseDto
	var videoId int
	var userId int

	getVideoByIdRow, _ := vc.baseCrudRepository.GetCustomQuery(fmt.Sprintf("SELECT id FROM videos WHERE video_url = ('%s')", videoCommentCreateDto.VideoUrl))
	getVideoByIdRow.Scan(&videoId)

	getUserByIdRow, _ := vc.baseCrudRepository.GetCustomQuery(fmt.Sprintf("SELECT id FROM users WHERE user_name = ('%s')", videoCommentCreateDto.UserName))
	getUserByIdRow.Scan(&userId)

	createData := map[string]interface{}{
		"user_id":  userId,
		"video_id": videoId,
		"comment":  videoCommentCreateDto.Comment,
	}

	row, _ := vc.baseCrudRepository.Create(createData)

	lastInsertId, _ := row.LastInsertId()

	query := fmt.Sprintf(`
	SELECT v.comment, u.user_name, u.profile_image_name FROM video_comments v
	INNER JOIN users u ON v.user_id = u.id
	WHERE v.id = %d`, lastInsertId)

	commonRow, _ := vc.baseCrudRepository.GetCustomQuery(query)

	commonRow.Scan(&comment.Comment, &comment.UserName, &comment.AccountImageName)

	return comment
}
