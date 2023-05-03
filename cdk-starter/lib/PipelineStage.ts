import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PhotosStack } from "./PhotosStack";
import { PhotosHandlerStack } from "./PhotosHandlerStack";

export class PipelineStage extends Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props);

        const photosStack = new PhotosStack(this, `PhotosStack-${props.stageName}`)
        const photosHandlerStack = new PhotosHandlerStack(this, `PhotosHandlerStack-${props.stageName}`, {
            stage: props.stageName!,
            targetBucketArn: photosStack.photosBucketArn
        })
    }
}