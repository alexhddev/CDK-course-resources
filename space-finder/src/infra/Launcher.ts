import { App } from "aws-cdk-lib";
import { ApiStack } from "./stacks/ApiStack";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { AuthStack } from "./stacks/AuthStack";



const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});
new AuthStack(app, 'AuthStack');


new ApiStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration
})