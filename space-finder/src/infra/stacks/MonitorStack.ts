import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Alarm, Metric } from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { join } from "path";

export class MonitorStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..','..', 'services', 'monitor', 'handler.ts')),
        })

        const alarmTopic = new Topic(this, 'AlarmTopic', {
            displayName: 'AlarmTopic',
            topicName: 'AlarmTopic'
        });
        alarmTopic.addSubscription(new LambdaSubscription(webHookLambda));

        const apiAlarm = new Alarm(this, 'apiAlarm', {
            metric: new Metric({
                metricName:'5XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(5)
            }),
            evaluationPeriods: 1,
            threshold: 1,   
            alarmName: 'SpacesApiAlarm',
            

        }).addAlarmAction(new SnsAction(alarmTopic));
    }

}