import { handler } from "../../../src/services/spaces/handler";


Items: [{
    id: {
        S: '123'
    },
    location: {
        S: 'Paris'
    }
}]

jest.mock('@aws-sdk/client-dynamodb', () => {
    return {
        DynamoDBClient: jest.fn().mockImplementation(() => {
            return {
                send: jest.fn().mockImplementation(() => {
                    return {
                        Items: [{
                            id: {
                                S: '123'
                            },
                            location: {
                                S: 'Paris'
                            }
                        }]
                    }
                })
            }
        }),
        ScanCommand: jest.fn()
    }
});


describe('Spaces handler test suite', () => {

    test('Returns spaces from dynamoDb', async () => {



        const result = await handler({
            httpMethod: 'GET'
        } as any, {} as any);

        expect(result.statusCode).toBe(201);
        const expectedResult = [{
            id: '123',
            location: 'Paris'
        }];
        const parsedResultBody = JSON.parse(result.body);
        expect(parsedResultBody).toEqual(expectedResult);
    });


})