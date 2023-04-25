import { SNSEvent } from "aws-lambda";
import { handler } from "../src/services/monitor/handler";


const event: SNSEvent = {
    Records:[{
        Sns: {
            Message: 'this is just a test!'
        }
    }]
} as any;

handler(event, {})