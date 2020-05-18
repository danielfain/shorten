package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"os"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Body represents the url to be shortened from the request
type Body struct {
	URL string `json:"url"`
}

// byte represents ASCII characters; use rune for unicode support
var letters = []byte("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
var numLetters = 6

// Handler for the lambda function
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	db, err := sql.Open("mysql", os.Getenv("db_string"))

	if err != nil {
		println("MYSQL CONN: " + err.Error())
	}

	defer db.Close()

	var body Body

	err = json.Unmarshal([]byte(request.Body), &body)

	if err != nil {
		println("BODY UNMARSHAL: " + err.Error())
	}

	shortURL := os.Getenv("host") + randomLetters(numLetters)

	var response = Body{URL: shortURL}
	r, err := json.Marshal(response)

	if err != nil {
		println("BODY MARSHAL: " + err.Error())
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers:    map[string]string{"Access-Control-Allow-Origin": "*"},
		Body:       string(r),
	}, nil
}

func randomLetters(n int) string {
	seq := make([]byte, n)
	for i := range seq {
		seq[i] = letters[rand.Intn(len(letters))]
	}
	return string(seq)
}

func main() {
	lambda.Start(Handler)
}
