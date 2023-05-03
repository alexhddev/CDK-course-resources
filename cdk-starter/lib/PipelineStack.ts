import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { readdir } from "fs";


export class PipeLineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'AwesomePipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('alexhddev/CDK-course-resources', 'pipe-test'),
                primaryOutputDirectory: 'cdk-starter/cdk.out',
                commands: [
                    'cd cdk-starter',
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ],
            })
        });
        readdir(process.cwd(), (err,filename)=>console.log(filename))
        
    }
}