package dto

type VideoResponseDto struct {
	VideoUrl         string `json:"video_url" db:"video_url"`
	VideoTitle       string `json:"video_title" db:"video_title"`
	VideoDescription string `json:"video_description" db:"video_description"`
}

type VideoCreateDto struct {
	VideoUrl            string `json:"video_url"`
	VideoCoverImageName string `json:"video_cover_image_name"`
	VideoTitle          string `json:"video_title"`
	VideoDescription    string `json:"video_description"`
	VideoViewCount      int    `json:"video_view_count"`
	UserId              int    `json:"user_id"`
}

type VideoWithUserResponseDto struct {
	VideoUrl            string `json:"video_url"`
	VideoCoverImageName string `json:"video_cover_image_name"`
	VideoTitle          string `json:"video_title"`
	TimeDif             int    `json:"time_dif"`
	UserName            string `json:"account_name"`
	ProfileImageName    string `json:"profile_image_name"`
}

type VideoShowResponseDto struct {
	VideoUrl            string `json:"video_url"`
	VideoCoverImageName string `json:"video_cover_image_name"`
	VideoTitle          string `json:"video_title"`
	VideoDescription    string `json:"video_description"`
	UserName            string `json:"account_name"`
	ProfileImageName    string `json:"profile_image_name"`
}

type VideoCommentCreateDto struct {
	VideoUrl string `json:"video_url"`
	UserName string `json:"user_name"`
	Comment  string `json:"comment"`
}

type VideoCommentReponseDto struct {
	Comment          string `json:"comment"`
	UserName         string `json:"account_name"`
	AccountImageName string `json:"account_image_name"`
}

type VideoAndCommentsReponseDto struct {
	Comments []VideoCommentReponseDto `json:"comments"`
	Video    VideoShowResponseDto     `json:"video"`
}
