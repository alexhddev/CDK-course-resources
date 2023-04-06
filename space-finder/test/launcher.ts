import { handler } from "../src/services/spaces/handler";


process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = 'SpaceTable-020fda1d7783'

handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: '260077ce-d319-4f60-99f6-9ac9211f62b0'
    }
    // body: JSON.stringify({
    //     location: 'Dublin'
    // })
} as any, {} as any);