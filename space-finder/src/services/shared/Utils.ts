import { APIGatewayProxyEvent, APIGatewayProxyResult, } from "aws-lambda";
import { JsonError } from "./Validator";
import { randomUUID } from "crypto";

export function createRandomId(){
    return randomUUID();
}

export function addCorsHeader(arg: APIGatewayProxyResult) {
    if(!arg.headers) {
        arg.headers = {}
    }
    arg.headers['Access-Control-Allow-Origin'] = '*';
    arg.headers['Access-Control-Allow-Methods'] = '*';
}

export function parseJSON(arg: string){
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message)
    }
}

export function hasAdminGroup(event: APIGatewayProxyEvent){
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    }
    return false;
}