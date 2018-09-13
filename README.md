# nightharbor-s3-reporter
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-reporter.svg?style=svg)](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-reporter)
[![sonarcloud badge](https://sonarcloud.io/api/project_badges/measure?project=YoshiyukiKato_nightharbor-s3-reporter&metric=alert_status)](https://sonarcloud.io/api/project_badges/measure?project=YoshiyukiKato_nightharbor-s3-reporter&metric=alert_status)

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