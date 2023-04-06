import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";


const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                console.log(getResponse)
                return getResponse;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }




    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return response;
}

export { handler }