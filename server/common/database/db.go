package database

import (
	"database/sql"
	"log"
	"strings"
	"youtube-clone/migrations"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitDb(dataPath string) *sql.DB {
	var err error

	db, err = sql.Open("sqlite3", dataPath)

	if err != nil {
		log.Fatalf("Error opening database: %s", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Error connection to the database: %s", err)
	}

	_, err = db.Exec(strings.Join(migrations.CrateTableQuerys, ";"))

	if err != nil {
		log.Fatalf("Error creating tables: %s", err)
	}

	return db
}

func CloseDb() {
	if db != nil {
		db.Close()
	}
}
