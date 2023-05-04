



async function handler(event:any, context: any) {
    return {
        statusCode: 200,
        body: 'Hello!'
    }
}

export { handler }