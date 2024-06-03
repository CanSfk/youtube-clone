package utils

import (
	"math/rand"
	"strings"
)

type Options struct {
	OriginalFilename string
	RandomNameLength int
}

func GenerateRandomName(options Options) string {
	if options.RandomNameLength <= 0 {
		options.RandomNameLength = 15
	}

	extensiton := options.OriginalFilename[strings.LastIndex(options.OriginalFilename, "."):]

	letterRunes := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	fileName := make([]rune, options.RandomNameLength)

	for i := range fileName {
		fileName[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(fileName) + extensiton
}
