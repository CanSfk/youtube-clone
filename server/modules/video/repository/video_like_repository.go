package repository

import (
	"fmt"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/video/model/dto"
)

type IVideoLikeRepository interface {
	LikeOperations(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error)
	LikeControl(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error)
}

type videoLikeRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewVideoLikeRepository(baseCrudRepository repositories.IBaseCrudRepository) IVideoLikeRepository {
	return &videoLikeRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (vc *videoLikeRepository) LikeControl(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error) {
	videoId := 0
	videoLikeId := 0

	videoIdQuery := fmt.Sprintf("Select id from videos where video_url = ('%s')", videoLikeCreateDto.VideoUrl)
	videoIdRow, _ := vc.baseCrudRepository.GetCustomQuery(videoIdQuery)
	videoIdRow.Scan(&videoId)

	videoControlQuery := fmt.Sprintf("SELECT id FROM video_likes where video_id = %d and user_id = %d", videoId, videoLikeCreateDto.UserId)
	videoLikeRow, _ := vc.baseCrudRepository.GetCustomQuery(videoControlQuery)
	videoLikeRow.Scan(&videoLikeId)

	if videoLikeId == 0 {
		return false, nil
	}

	return true, nil
}

func (vc *videoLikeRepository) LikeOperations(videoLikeCreateDto dto.VideoLikeCreateDto) (bool, error) {
	likeId := 0
	videoId := 0
	getVideoQuery := fmt.Sprintf("Select id from videos where video_url = ('%s')", videoLikeCreateDto.VideoUrl)
	getVideoRow, _ := vc.baseCrudRepository.GetCustomQuery(getVideoQuery)
	getVideoRow.Scan(&videoId)

	createData := map[string]interface{}{
		"video_id": &videoId,
		"user_id":  &videoLikeCreateDto.UserId,
	}

	videoControlQuery := fmt.Sprintf("SELECT id FROM video_likes where video_id = %d and user_id = %d", videoId, videoLikeCreateDto.UserId)
	videoControlByIdRow, _ := vc.baseCrudRepository.GetCustomQuery(videoControlQuery)

	err := videoControlByIdRow.Scan(&likeId)

	if err != nil {
		_, createErr := vc.baseCrudRepository.Create(createData)

		if createErr != nil {
			return false, err
		}

		return true, nil
	}

	_, deleteErr := vc.baseCrudRepository.Delete(likeId)
	if deleteErr != nil {
		return false, deleteErr
	}

	return false, err
}
