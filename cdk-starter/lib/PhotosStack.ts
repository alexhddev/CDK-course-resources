import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Fn } from "aws-cdk-lib";

export class PhotosStack extends cdk.Stack {

    private stackSuffix: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix();

        new Bucket(this, 'PhotosBucket2', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });
    }

    private initializeSuffix(){
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}