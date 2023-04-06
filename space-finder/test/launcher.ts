import { handler } from "../src/services/spaces/handler";


process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = 'SpaceTable-020fda1d7783'

handler({
    httpMethod: 'GET',
    // body: JSON.stringify({
    //     location: 'Dublin'
    // })
} as any, {} as any);