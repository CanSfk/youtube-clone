package repository

import (
	"database/sql"
	"fmt"
	"youtube-clone/common/repositories"
	"youtube-clone/modules/user/model/dto"
)

type IUserSubscriberRepository interface {
	SubscriberControl(createSubscriberDto dto.CreateSubscriberDto) (int, error)
	CreateSubscriber(createSubscriberDto dto.CreateSubscriberDto) (bool, error)
	DeleteSubscriber(id int) (bool, error)
}

type UserSubscriberRepository struct {
	baseCrudRepository repositories.IBaseCrudRepository
}

func NewUserSubscriberRepository(baseCrudRepository repositories.IBaseCrudRepository) IUserSubscriberRepository {
	return &UserSubscriberRepository{
		baseCrudRepository: baseCrudRepository,
	}
}

func (s *UserSubscriberRepository) SubscriberControl(createSubscriberDto dto.CreateSubscriberDto) (int, error) {
	subId := 0

	subscriberControlQuery := fmt.Sprintf(`SELECT id FROM user_subscribers 
	where user_id = %d and user_subscriber_id = %d`, createSubscriberDto.UserId, createSubscriberDto.UserSubscriberId)

	subscriberControlRow, subErr := s.baseCrudRepository.GetCustomQuery(subscriberControlQuery)

	if subErr != nil {
		return subId, subErr
	}

	err := subscriberControlRow.Scan(&subId)
	if err != nil {
		if err == sql.ErrNoRows {
			return subId, err
		}
	}

	return subId, nil
}

func (s *UserSubscriberRepository) CreateSubscriber(createSubscriberDto dto.CreateSubscriberDto) (bool, error) {
	createData := map[string]interface{}{
		"user_id":            &createSubscriberDto.UserId,
		"user_subscriber_id": &createSubscriberDto.UserSubscriberId,
	}

	_, createErr := s.baseCrudRepository.Create(createData)

	if createErr != nil {
		return false, createErr
	}

	return true, nil
}

func (s *UserSubscriberRepository) DeleteSubscriber(id int) (bool, error) {
	_, deleteErr := s.baseCrudRepository.Delete(id)
	if deleteErr != nil {
		return false, deleteErr
	}

	return false, nil
}
