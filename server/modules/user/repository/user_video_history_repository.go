package repository

import (
	"database/sql"
	"fmt"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/model/dto"
)

type IUserVideoHistoryRepository interface {
	ControlHistory(vName string, createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (dto.ControlHistoryResonseDto, error)
	CreateHistory(createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (bool, error)
	UpdateOrderHistory(controlHistoryResponse dto.ControlHistoryResonseDto, createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (bool, error)
	GetHistory(createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) dto.ControlHistoryResonseDto
	// DeleteSubscriber(id int) (bool, error)
}

type UserVideoHistoryRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewUserVideoHistoryRepository(baseCrudRepository repositories.IBaseCrudRepository) IUserVideoHistoryRepository {
	return &UserVideoHistoryRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (u *UserVideoHistoryRepository) GetHistory(createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) dto.ControlHistoryResonseDto {
	respone := dto.ControlHistoryResonseDto{}

	query := fmt.Sprintf(`SELECT id, video_order FROM user_video_histories 
	WHERE user_id = %d AND video_id = %d`, createUserVideoHistoryDto.UserId, createUserVideoHistoryDto.VideoId)

	row, _ := u.baseCrudRepository.GetCustomQuery(query)

	err := row.Scan(&respone.HistoryId, &respone.Order)

	if err != nil {
		if err == sql.ErrNoRows {
			return dto.ControlHistoryResonseDto{}
		}
	}

	return respone
}

func (u *UserVideoHistoryRepository) ControlHistory(vName string, createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (dto.ControlHistoryResonseDto, error) {
	response := dto.ControlHistoryResonseDto{}
	videoQuery := fmt.Sprintf(`SELECT id FROM videos 
	WHERE video_url = ('%s')`, vName)

	videoRow, _ := u.baseCrudRepository.GetCustomQuery(videoQuery)
	videoRow.Scan(&createUserVideoHistoryDto.VideoId)

	responseHistory := u.GetHistory(createUserVideoHistoryDto)

	subscriberControlQuery2 := fmt.Sprintf(`SELECT id, video_order FROM user_video_histories 
	WHERE user_id = %d ORDER BY video_order DESC LIMIT 1`, createUserVideoHistoryDto.UserId)

	historyControlRow2, hisErr := u.baseCrudRepository.GetCustomQuery(subscriberControlQuery2)

	if hisErr != nil {
		return response, hisErr
	}

	err := historyControlRow2.Scan(&response.HistoryId, &response.Order)
	if err != nil {
		return response, err
	}

	if responseHistory.HistoryId == 0 {
		response.HistoryId = 0
	}

	if responseHistory.Order == 1 {
		response.Order = 1
	}

	return response, nil
}

func (u *UserVideoHistoryRepository) CreateHistory(createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (bool, error) {
	createData := map[string]interface{}{
		"user_id":     &createUserVideoHistoryDto.UserId,
		"video_id":    &createUserVideoHistoryDto.VideoId,
		"video_order": &createUserVideoHistoryDto.Order,
	}

	_, createErr := u.baseCrudRepository.Create(createData)

	if createErr != nil {
		return false, createErr
	}

	return true, nil
}

func (u *UserVideoHistoryRepository) UpdateOrderHistory(controlHistoryResponse dto.ControlHistoryResonseDto, createUserVideoHistoryDto dto.CreateUserVideoHistoryDto) (bool, error) {
	updateData := []interface{}{
		createUserVideoHistoryDto.UserId,
		createUserVideoHistoryDto.VideoId,
		controlHistoryResponse.Order,
	}

	updateQuery1 := "UPDATE user_video_histories SET video_order = video_order + 1 WHERE user_id = ? AND video_id != ? AND video_order < ?"
	updateQuery2 := "UPDATE user_video_histories SET video_order = 1 WHERE id = ?"

	_, query1Err := u.baseCrudRepository.ExecCustom(updateQuery1, updateData)
	if query1Err != nil {
		return false, query1Err
	}

	_, query2Err := u.baseCrudRepository.ExecCustom(updateQuery2, []interface{}{controlHistoryResponse.HistoryId})
	if query2Err != nil {
		return false, query2Err
	}

	return true, nil
}

// func (u *UserVideoHistoryRepository) DeleteSubscriber(id int) (bool, error) {
// 	_, deleteErr := u.baseCrudRepository.Delete(id)
// 	if deleteErr != nil {
// 		return false, deleteErr
// 	}

// 	return false, nil
// }
