package service

import (
	"youtube-clone/modules/video/model/dto"
	"youtube-clone/modules/video/repository"
)

type IVideoService interface {
	GetAllVideos() []dto.VideoResponseDto
	GetAllVideosWithUser() []dto.VideoWithUserResponseDto
	CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoWithUserResponseDto
	GetVideoByName(videoName string) (dto.VideoShowResponseDto, []dto.VideoCommentReponseDto, error)
}

type videoService struct {
	videoRepository repository.IVideoRepository
}

func NewVideoService(videoRepository repository.IVideoRepository) IVideoService {
	return &videoService{
		videoRepository: videoRepository,
	}
}

func (vs *videoService) GetAllVideos() []dto.VideoResponseDto {
	return vs.videoRepository.GetAllVideos()
}

func (vs *videoService) GetAllVideosWithUser() []dto.VideoWithUserResponseDto {
	return vs.videoRepository.GetAllVideosWithUser()
}

func (vs *videoService) CreateVideo(videoCreateDto dto.VideoCreateDto) dto.VideoWithUserResponseDto {
	return vs.videoRepository.CreateVideo(videoCreateDto)
}

func (vs *videoService) GetVideoByName(videName string) (dto.VideoShowResponseDto, []dto.VideoCommentReponseDto, error) {
	return vs.videoRepository.GetVideoByName(videName)
}
