#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';

const app = new cdk.App();
new CdkCicdStack(app, 'CdkCicdStack', {
});

app.synth();