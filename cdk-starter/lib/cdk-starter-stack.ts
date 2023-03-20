import * as cdk from 'aws-cdk-lib';
import { CfnOutput, CfnParameter, Duration } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket 3 ways:
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration:{
        rules:[{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    const duration = new CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })

    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }]
    });
    
    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    })



    new L3Bucket(this, 'MyL3Bucket', 3);



  }
}
