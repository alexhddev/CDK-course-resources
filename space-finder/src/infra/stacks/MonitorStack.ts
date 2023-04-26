import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Alarm, Metric, Unit } from "aws-cdk-lib/aws-cloudwatch";
import { Construct } from "constructs";



export class MonitorStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const spacesApi4xxAlarm = new Alarm(this, 'spacesApi4xxAlarm', {
            metric: new Metric({
                metricName: '4XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "SpacesApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 5,
            alarmName: 'SpacesApi4xxAlarm'
        });
    }
}