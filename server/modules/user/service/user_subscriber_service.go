package service

import (
	"youtube-clone/modules/user/model/dto"
	"youtube-clone/modules/user/repository"
)

type IUserSubscriberService interface {
	SubscriberOperations(createSubscriberDto dto.CreateSubscriberDto) (bool, error)
	GetSubscriber(createSubscriberDto dto.CreateSubscriberDto) bool
}

type UserSubscriberService struct {
	userSubscriberRepository repository.IUserSubscriberRepository
}

func NewUserSubscriberService(userSubscriberRepository repository.IUserSubscriberRepository) IUserSubscriberService {
	return &UserSubscriberService{
		userSubscriberRepository: userSubscriberRepository,
	}
}

func (s *UserSubscriberService) GetSubscriber(createSubscriberDto dto.CreateSubscriberDto) bool {
	subControl, _ := s.userSubscriberRepository.SubscriberControl(createSubscriberDto)

	return subControl != 0
}

func (s *UserSubscriberService) SubscriberOperations(createSubscriberDto dto.CreateSubscriberDto) (bool, error) {
	subControl, _ := s.userSubscriberRepository.SubscriberControl(createSubscriberDto)

	if subControl == 0 {
		createSub, createErr := s.userSubscriberRepository.CreateSubscriber(createSubscriberDto)

		if createErr != nil {
			return false, createErr
		}

		return createSub, nil
	}

	return s.userSubscriberRepository.DeleteSubscriber(subControl)
}
