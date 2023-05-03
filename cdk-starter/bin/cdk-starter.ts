#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { PipeLineStack } from '../lib/PipelineStack';

const app = new cdk.App();
new PipeLineStack(app, 'PipelineStack')

app.synth();