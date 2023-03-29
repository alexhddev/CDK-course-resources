import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'



async function handler(event: APIGatewayProxyEvent, context: Context) {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify('Hello from lambda, this is the id:' + v4())
    }
    console.log(event);

    return response;
}

export { handler }