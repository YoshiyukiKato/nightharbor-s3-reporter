# nightharbor-s3-reporter
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-reporter.svg?style=svg)](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-reporter)
[![Greenkeeper badge](https://badges.greenkeeper.io/YoshiyukiKato/nightharbor-s3-reporter.svg)](https://greenkeeper.io/)

A [nightharbor](https://github.com/YoshiyukiKato/nightharbor) reporter for AWS S3.

```sh
$ npm install --save aws-sdk nightharbor nightharbor-s3-reporter
```

#### report by json and csv

```js
import {S3CsvReporter,S3JsonReporter} from "nightharbor-s3-reporter";
import AWS from "aws-sdk";
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();

export default {
  ...,
  reporters: [
    new S3JsonReporter(s3, "bucket name", "/path/to/output.json"),
    new S3CsvReporter(s3, "bucket name", "/path/to/output.csv")
  ]
  ...
}
```