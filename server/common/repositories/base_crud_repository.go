package repositories

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
)

type IBaseCrudRepository interface {
	GetAll(fields ...string) (*sql.Rows, error)
	GetById(id int, fields ...string) (*sql.Row, error)
	Create(data map[string]interface{}) (sql.Result, error)
	ExecCustom(query string, data []interface{}) (bool, error)
	GetAllCustomQuery(query string) (*sql.Rows, error)
	GetCustomQuery(query string) (*sql.Row, error)
	// Update(id int, entity interface{}) (interface{}, error)
	Delete(id int) (bool, error)
}

type baseCrudRepository struct {
	db        *sql.DB
	tableName string
}

func NewBaseCrudRepository(db *sql.DB, tableName string) IBaseCrudRepository {
	return &baseCrudRepository{
		db:        db,
		tableName: tableName,
	}
}

func (r *baseCrudRepository) GetAll(fields ...string) (*sql.Rows, error) {
	query := fmt.Sprintf("SELECT %s FROM %s", strings.Join(fields, ","), r.tableName)

	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Fatalf("Query error: %s", err)
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Fatalf("An error occurred during the query: %s", err)
	}

	return rows, nil
}

func (r *baseCrudRepository) GetById(id int, fields ...string) (*sql.Row, error) {
	query := fmt.Sprintf("SELECT %s FROM %s WHERE id = %d", strings.Join(fields, ","), r.tableName, id)

	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Fatalf("Query error: %s", err)
	}
	defer stmt.Close()

	row := stmt.QueryRow()

	if err := row.Err(); err != nil {
		log.Fatalf("Item not found: %s", err)
	}

	return row, nil
}

func (r *baseCrudRepository) Create(data map[string]interface{}) (sql.Result, error) {
	dataKeys := make([]string, 0, len(data))
	placeholder := make([]string, 0, len(data))
	values := make([]interface{}, 0, len(data))

	for key, value := range data {
		dataKeys = append(dataKeys, key)
		placeholder = append(placeholder, "?")
		values = append(values, value)
	}

	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", r.tableName, strings.Join(dataKeys, ","), strings.Join(placeholder, ","))

	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Fatalf("Query error: %s", err)
	}
	defer stmt.Close()

	row, err := stmt.Exec(values...)
	if err != nil {
		log.Fatalf("An error occurred during the query %s", err)
	}

	return row, nil
}

func (r *baseCrudRepository) Delete(id int) (bool, error) {
	query := fmt.Sprintf("DELETE FROM %s where id = ?", r.tableName)

	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Fatalf("Query error: %s", err)
	}
	defer stmt.Close()

	_, execErr := stmt.Exec(id)
	if execErr != nil {
		return false, err
	}

	return true, nil
}

func (r *baseCrudRepository) ExecCustom(query string, data []interface{}) (bool, error) {
	stmt, err := r.db.Prepare(query)
	if err != nil {
		log.Fatalf("Query error: %s", err)
	}
	defer stmt.Close()

	_, execErr := stmt.Exec(data...)
	if execErr != nil {
		log.Fatalf("An error occurred during the query %s", execErr)
	}

	return true, nil
}

func (r *baseCrudRepository) GetAllCustomQuery(query string) (*sql.Rows, error) {
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}

	return rows, nil
}

func (r *baseCrudRepository) GetCustomQuery(query string) (*sql.Row, error) {
	stmt, err := r.db.Prepare(query)

	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	row := stmt.QueryRow()

	return row, nil
}
