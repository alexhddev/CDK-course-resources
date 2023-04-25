import {type SNSEvent } from "aws-lambda";


const webhookUrl = 'https://hooks.slack.com/services/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'

async function handler(event: SNSEvent, context) {

    for(const record of event.Records) {
        await fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston we have a problem: ${record.Sns.Message}`
            })
        })
    }

}

export { handler }