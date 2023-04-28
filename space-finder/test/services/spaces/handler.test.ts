import { AttributeValue } from "aws-lambda";
import { handler } from "../../../src/services/spaces/handler";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


const sendMock = jest.fn();

jest.mock('@aws-sdk/client-dynamodb', () => {
    return {
        DynamoDBClient: jest.fn().mockImplementation(() => {
            return {
                send: ()=> sendMock
            }
        })
    }
});

describe('Spaces handler test suite', () => {

    test('Returns spaces from dynamoDb', async () => {

        const items: Record<string, AttributeValue>[] = [{
            id: {
                S: '123'
            },
            location: {
                S: 'Paris'
            }
        }];
        sendMock.mockResolvedValueOnce(items);

        const result = await handler({
            httpMethod: 'GET'
        } as any, {} as any);

        expect(result.statusCode).toBe(201);
        const expectedResult = {
            id: '123',
            location: 'Paris'
        }
        const parsedResultBody = JSON.parse(result.body);
        expect(parsedResultBody).toEqual(expectedResult);
    });


})