import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";


interface LambdaStackProps extends StackProps {
    stageName?: string
}

export class LambdaStack extends Stack {

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        new NodejsFunction(this, 'hello-lambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..', 'services', 'hello.ts')),
            environment: {
                STAGE: props.stageName!
            }
        })


    }
}