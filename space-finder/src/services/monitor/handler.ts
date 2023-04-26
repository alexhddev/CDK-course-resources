import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}


export { handler }