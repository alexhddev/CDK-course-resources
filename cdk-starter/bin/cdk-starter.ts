#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';
import { BucketTagger } from './Tagger';

const app = new cdk.App();
const photosStack = new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photosBucketArn
});

const tagger = new BucketTagger('level', 'test');
cdk.Aspects.of(app).add(tagger);