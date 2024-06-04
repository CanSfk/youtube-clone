package service

import (
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/repository"
)

type IVideoCommentService interface {
	CreateVideoComment(videoCommentCreateDto dto.VideoCommentCreateDto) dto.VideoCommentReponseDto
}

type videoCommentService struct {
	videoRepository repository.IVideoCommentRepository
}

func NewVideoCommentService(videoRepository repository.IVideoCommentRepository) IVideoCommentService {
	return &videoCommentService{
		videoRepository: videoRepository,
	}
}

func (vc *videoCommentService) CreateVideoComment(videoCommentCreateDto dto.VideoCommentCreateDto) dto.VideoCommentReponseDto {
	return vc.videoRepository.CreateVideoComment(videoCommentCreateDto)
}
