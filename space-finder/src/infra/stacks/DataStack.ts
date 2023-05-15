import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';
import { Bucket, BucketAccessControl, HttpMethods, IBucket, ObjectOwnership } from 'aws-cdk-lib/aws-s3';


export class DataStack extends Stack {

    public readonly spacesTable: ITable
    public readonly deploymentBucket: IBucket;
    public readonly photosBucket: IBucket;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.photosBucket = new Bucket(this, 'SpaceFinderPhotos', {
            bucketName: `space-finder-photos-${suffix}`,
            cors: [{
                allowedMethods: [
                    HttpMethods.HEAD,
                    HttpMethods.GET,
                    HttpMethods.PUT
                ],
                allowedOrigins: ['*'],
                allowedHeaders: ['*']
            }],
            // accessControl: BucketAccessControl.PUBLIC_READ, // currently not working,
            objectOwnership: ObjectOwnership.OBJECT_WRITER,
            blockPublicAccess: {
                blockPublicAcls: false,
                blockPublicPolicy: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false
            }
        });
        new CfnOutput(this, 'SpaceFinderPhotosBucketName', {
            value: this.photosBucket.bucketName
        });


        this.spacesTable = new Table(this, 'SpacesTable', {
            partitionKey : {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `SpaceTable-${suffix}`
        })
    }
}