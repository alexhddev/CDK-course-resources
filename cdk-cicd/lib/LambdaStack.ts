import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";


interface LambdaStackProps extends StackProps {
    stageName?: string
}

export class LambdaStack extends Stack {

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)
    }
}