package service

import (
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserVideoHistoryService interface {
	CreateHistory(vName string, createUserVideoHistory dto.CreateUserVideoHistoryDto) (bool, error)
}

type UserVideoHistoryService struct {
	userVideoHistoryRepository repository.IUserVideoHistoryRepository
}

func NewUserVideoHistoryService(userVideoHistoryRepository repository.IUserVideoHistoryRepository) IUserVideoHistoryService {
	return &UserVideoHistoryService{
		userVideoHistoryRepository: userVideoHistoryRepository,
	}
}

func (s *UserVideoHistoryService) CreateHistory(vName string, createUserVideoHistory dto.CreateUserVideoHistoryDto) (bool, error) {
	responseControl, _ := s.userVideoHistoryRepository.ControlHistory(vName, createUserVideoHistory)
	// fmt.Println(responseControl)

	// if resErr != nil {
	// 	return false, resErr
	// }

	if responseControl.HistoryId == 0 {
		if responseControl.Order == 0 {
			createUserVideoHistory.Order = 1
		} else {
			createUserVideoHistory.Order = responseControl.Order + 1
		}

		return s.userVideoHistoryRepository.CreateHistory(createUserVideoHistory)
	}

	if responseControl.Order != 1 {
		return s.userVideoHistoryRepository.UpdateOrderHistory(responseControl, createUserVideoHistory)
	}

	return true, nil
}
