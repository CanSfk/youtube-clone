package dto

type CreateSubscriberDto struct {
	UserId           int `json:"user_id"`
	UserSubscriberId int `json:"user_subscriber_id"`
}
