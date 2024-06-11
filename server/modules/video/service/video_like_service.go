package service

import (
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/repository"
)

type IVideoLikeService interface {
	LikeOperations(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error)
}

type videoLikeService struct {
	videoLikeRepository repository.IVideoLikeRepository
}

func NewVideoLikeService(videoLikeRepository repository.IVideoLikeRepository) IVideoLikeService {
	return &videoLikeService{
		videoLikeRepository: videoLikeRepository,
	}
}

func (vc *videoLikeService) LikeOperations(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error) {
	return vc.videoLikeRepository.LikeOperations(videoLikeCreateDto)
}
