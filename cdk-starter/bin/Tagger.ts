import { IAspect } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";


export class BucketTagger implements IAspect {

    private key: string;
    private value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }


    visit(node: IConstruct): void {
        if (node instanceof CfnBucket) {
            node.tags.setTag(this.key, this.value);
        }
        
    }

    
}