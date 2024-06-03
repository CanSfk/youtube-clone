package utils

import (
	"errors"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
)

func UploadVideo(file multipart.FileHeader) (string, error) {
	src, openErr := file.Open()
	if openErr != nil {
		return "", errors.New("video could not be opened")
	}
	defer src.Close()

	newFileName := GenerateRandomName(Options{OriginalFilename: file.Filename})

	dstPath := filepath.Join("public/uploads/videos/", newFileName)
	dst, dstErr := os.Create(dstPath)
	if dstErr != nil {
		return "", errors.New("video could not be created")
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		return "", errors.New("video could not be copied")
	}

	return newFileName, nil
}
