import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";



export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME,
    }));
    console.log(result.Items);

    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }
}