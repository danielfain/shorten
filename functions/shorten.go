package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/aws"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
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
	var body Body

	err := json.Unmarshal([]byte(request.Body), &body)

	if err != nil {
		println("BODY UNMARSHAL: " + err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
		}, err
	}

	id := randomLetters(numLetters)
	shortURL := os.Getenv("host") + id

	svc := dynamodb.New(session.New())

	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
			"url": {
				S: aws.String(body.URL),
			},
		},
		TableName: aws.String(os.Getenv("table_name")),
	}

	_, err = svc.PutItem(input)

	if err != nil {
		println(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
		}, err
	}

	var response = Body{URL: shortURL}
	j, err := json.Marshal(response)

	if err != nil {
		println("BODY MARSHAL: " + err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
		}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers:    map[string]string{"Access-Control-Allow-Origin": "*"},
		Body:       string(j),
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
