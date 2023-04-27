import { App } from 'aws-cdk-lib';
import { MonitorStack } from '../../src/infra/stacks/MonitorStack';
import { Capture, Match, Template } from 'aws-cdk-lib/assertions';


describe('MonitorStack test suite', () => {

    let monitorStackTemplate: Template;

    beforeAll(() => {
        const app = new App({
            outdir: 'cdk.out.test'
        });
        const stack = new MonitorStack(app, 'MonitorStack');
        monitorStackTemplate = Template.fromStack(stack);
    })

    test('WebHook lambda properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs18.x'
        });
    });
    test('Alarm topic properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Topic', {
            DisplayName: 'AlarmTopic',
            TopicName: 'AlarmTopic'
        });
    });
    test('Alarm topic subscription - with matchers', () => {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
            Match.objectEquals({
                Protocol: 'lambda',
                TopicArn: {
                    Ref: Match.stringLikeRegexp('AlarmTopic')
                },
                Endpoint: {
                    'Fn::GetAtt': [
                        Match.stringLikeRegexp('webHookLambda'),
                        'Arn'
                    ]
                }
            }));
    });

    test('Alarm topic subscription - with exact names', () => {
        const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic');
        const snsTopicName = Object.keys(snsTopic)[0];

        const lambda = monitorStackTemplate.findResources('AWS::Lambda::Function');
        const lambdaName = Object.keys(lambda)[0];

        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
            {
                Protocol: 'lambda',
                TopicArn: {
                    Ref: snsTopicName
                },
                Endpoint: {
                    'Fn::GetAtt': [
                        lambdaName,
                        'Arn'
                    ]
                }
            });
    });

    test('Spaces alarm with capture', () => {
        const alarmActionsCaptor = new Capture();
        monitorStackTemplate.hasResourceProperties('AWS::CloudWatch::Alarm', {
            AlarmActions: alarmActionsCaptor
        });

        expect(alarmActionsCaptor.asArray()).toEqual([{
            Ref: expect.stringMatching(/^AlarmTopic/)
        }]);
    });

    test('MonitorStack snapshot testing - whole stack', ()=>{
        expect(monitorStackTemplate.toJSON()).toMatchSnapshot();
    })

    test('Lambda snapshot test', ()=>{
        const lambda = monitorStackTemplate.findResources('AWS::Lambda::Function');
        expect(lambda).toMatchSnapshot();
    })

    test('SnsTopic snapshot test', ()=>{
        const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic');
        expect(snsTopic).toMatchSnapshot();
    })
});