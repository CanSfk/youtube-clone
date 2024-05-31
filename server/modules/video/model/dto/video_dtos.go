package dto

type VideoResponseDto struct {
	VideoUrl         string `json:"video_url" db:"video_url"`
	VideoTitle       string `json:"video_title" db:"video_title"`
	VideoDescription string `json:"video_description" db:"video_description"`
}

type VideoCreateDto struct {
	VideoUrl         string `json:"video_url"`
	VideoTitle       string `json:"video_title"`
	VideoDescription string `json:"video_description"`
	UserId           int    `json:"user_id"`
}
