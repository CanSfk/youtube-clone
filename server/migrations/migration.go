package migrations

var CrateTableQuerys = []string{
	`CREATE TABLE IF NOT EXISTS Users(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	full_name VARCHAR(255) NOT NULL,
	user_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`,

	`CREATE TABLE IF NOT EXISTS Videos(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	video_url VARCHAR(255) NOT NULL,
	video_title VARCHAR(255) NOT NULL,
	video_description VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES Users(id)
	)`,
}

// var CreateUserTable string = `
// CREATE USER TABLE IF NOT EXISTS Users(
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	full_name VARCHAR(255) NOT NULL,
// 	user_name VARCHAR(255) NOT NULL,
// 	password VARCHAR(255) NOT NULL
// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`

// var CreateVideoTable string = `
// CREATE USER TABLE IF NOT EXISTS Videos(
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	video_url VARCHAR(255) NOT NULL,
// 	video_title VARCHAR(255) NOT NULL
// 	video_description VARCHAR(255) NOT NULL
// 	user_id INTEGER NOT NULL,
// 	FOREIGN KEY (user_id) REFERENCES Users(id)
// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`
