import { App } from "aws-cdk-lib";
import { MonitorStack } from "../../src/infra/stacks/MonitorStack";
import { Template } from "aws-cdk-lib/assertions";


describe('MonitorStack test suite', ()=>{

    test('Initial test', ()=>{
        const app = new App({
            outdir: 'cdk.out.test'
        });
        const stack = new MonitorStack(app, 'MonitorStack');

        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::Lambda::Function',{})
    })
});