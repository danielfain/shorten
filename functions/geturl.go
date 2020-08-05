package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/aws"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

// URLResponse represents the API response with the corresponding URL from the ID
type URLResponse struct {
	URL string `json:"url"`
}

// Handler for the lambda function
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	svc := dynamodb.New(session.New())

	id := request.QueryStringParameters["id"]

	input := &dynamodb.GetItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
		},
		TableName: aws.String(os.Getenv("table_name")),
	}

	result, err := svc.GetItem(input)

	if err != nil {
		println(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusNotFound,
		}, err
	}

	var url = result.Item["url"].S
	var response = URLResponse{
		URL: *url,
	}
	r, err := json.Marshal(response)

	if err != nil {
		println("BODY MARSHAL: " + err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
		}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers:    map[string]string{"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
		Body:       string(r),
	}, nil
}

func main() {
	lambda.Start(Handler)
}
