package utils

import (
	"errors"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/chai2010/webp"
	"github.com/nfnt/resize"
)

var imageSizes = map[string]int{
	"md": 720,
	"sm": 340,
}

func UploadImage(file multipart.FileHeader, resizedImageState bool) (string, error) {
	dstPath := ""

	src, openErr := file.Open()

	if openErr != nil {
		return "", errors.New("image could not be opened")
	}
	defer src.Close()

	newFileName := GenerateRandomName(Options{OriginalFilename: file.Filename})

	if resizedImageState {
		dstPath = filepath.Join("public/uploads/images/", "lg-"+newFileName)
		defer resizedImage(dstPath, newFileName)
	} else {
		dstPath = filepath.Join("public/uploads/images/", newFileName)
	}

	dst, dstErr := os.Create(dstPath)
	if dstErr != nil {
		return "", errors.New("image could not be created")
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		return "", errors.New("image could not be copied")
	}

	return newFileName, nil
}

func resizedImage(fileUrl string, fileName string) error {
	file, err := os.Open(fileUrl)
	if err != nil {
		return errors.New("image could not be opened")
	}
	image, err := webp.Decode(file)
	if err != nil {
		return errors.New("image could not be decode")
	}

	for key, value := range imageSizes {
		m := resize.Resize(uint(value), 0, image, resize.Lanczos3)

		dstPath := filepath.Join("public/uploads/images/", key+"-"+fileName)

		dst, dstErr := os.Create(dstPath)
		if dstErr != nil {
			return errors.New("image could not be created")
		}
		defer dst.Close()

		if err := webp.Encode(dst, m, nil); err != nil {
			return errors.New("image could not be encoded")
		}
	}

	return nil
}
