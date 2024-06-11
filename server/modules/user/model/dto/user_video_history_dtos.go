package dto

type CreateUserVideoHistoryDto struct {
	UserId  int `json:"user_id"`
	VideoId int `json:"video_id"`
	Order   int `json:"video_order"`
}

type ControlHistoryResonseDto struct {
	HistoryId int `json:"id" db:"id"`
	Order     int `json:"order" db:"order"`
}
