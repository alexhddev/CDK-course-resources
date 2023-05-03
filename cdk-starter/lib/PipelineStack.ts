import { Stack, StackProps } from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { readdir } from "fs";
import { PipelineStage } from "./PipelineStage";


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
                    'npx cdk synth'
                ],
            })
        });
        const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
            stageName: 'test'
        }));
        testStage.addPre(new CodeBuildStep('test', {
            commands: [
                'npm run test'
            ],
            primaryOutputDirectory: 'cdk-starter/cdk.out'
        }))
    }
}