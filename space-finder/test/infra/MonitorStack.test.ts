import { App } from "aws-cdk-lib";
import { MonitorStack } from "../../src/infra/stacks/MonitorStack";
import { Capture, Match, Template } from "aws-cdk-lib/assertions";


describe('Monitor stack test suite', () => {

    let monitorStackTemplate: Template;

    beforeAll(() => {
        const testApp = new App({
            outdir: 'cdk.out'
        });
        const monitorStack = new MonitorStack(testApp, 'MonitorStack');
        monitorStackTemplate = Template.fromStack(monitorStack);
    })

    test('Lambda properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs18.x'
        });
    });

    test('Sns topic properties', () => {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Topic', {
            DisplayName: 'AlarmTopic',
            TopicName: 'AlarmTopic'
        });
    });

    test('Sns subscription properties - with matchers', () => {
        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
            Match.objectEquals(
                {
                    Protocol: 'lambda',
                    TopicArn: {
                        Ref: Match.stringLikeRegexp('AlarmTopic')
                    },
                    Endpoint: {
                        'Fn::GetAtt':[
                            Match.stringLikeRegexp('webHookLambda'),
                            'Arn' 
                        ]
                    }
                }));
    });

    test('Sns subscription properties - with exact values', () => {
        const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic');
        const snsTopicName = Object.keys(snsTopic)[0];

        const lambda = monitorStackTemplate.findResources('AWS::Lambda::Function');
        const lambdaName = Object.keys(lambda)[0]

        monitorStackTemplate.hasResourceProperties('AWS::SNS::Subscription',
            {
                Protocol: 'lambda',
                TopicArn: {
                    Ref: snsTopicName
                },
                Endpoint: {
                    'Fn::GetAtt':[
                        lambdaName,
                        'Arn' 
                    ]
                }
            });
    });

    test('Alarm actions', ()=>{
        const alarmActionsCapture = new Capture();
        monitorStackTemplate.hasResourceProperties('AWS::CloudWatch::Alarm', {
            AlarmActions: alarmActionsCapture
        });

        expect(alarmActionsCapture.asArray()).toEqual([{
            Ref: expect.stringMatching(/^AlarmTopic/)
        }])
    });

    test('Monitor stack snapshot', ()=>{
        expect(monitorStackTemplate.toJSON()).toMatchSnapshot();
    })

    test('Lambda stack snapshot', ()=>{
        const lambda = monitorStackTemplate.findResources('AWS::Lambda::Function')
        expect(lambda).toMatchSnapshot();
    });

    test('SnsTopic stack snapshot', ()=>{
        const snsTopic = monitorStackTemplate.findResources('AWS::SNS::Topic')
        expect(snsTopic).toMatchSnapshot();
    })









})