import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";



const app = new App();
new DataStack(app, 'DataStack');