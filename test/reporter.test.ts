import AWS from "aws-sdk";
import csv from "csvtojson";
import fs from "fs-extra";
import path from "path";
import assert from "power-assert";
import {S3CsvReporter, S3JsonReporter} from "../src";
import {S3Local} from "./fixture/s3-local";

describe("AWS S3 reporters", () => {
  const s3host = "localhost";
  const s3port = 4569;
  const s3dir = path.resolve(__dirname, "./outputs/s3");
  const s3Local = new S3Local(s3host, s3port, s3dir);
  const bucketName = "test";
  // AWS.config.update();
  const s3 = new AWS.S3({
    credentials: new AWS.Credentials({
      accessKeyId: "",
      secretAccessKey: "",
    }),
    endpoint: `http://${s3host}:${s3port}/${bucketName}`,
    s3BucketEndpoint: true,
  });

  before(() => {
    // refresh directory for s3
    fs.removeSync(s3dir);
    fs.mkdirpSync(s3dir);
    // start local s3
    return s3Local.up()
      .then(() => {
        return s3.createBucket({ Bucket: bucketName }).promise();
      });
  });

  after(() => {
    // teardown local s3
    return s3Local.down()
      .then(() => {
        fs.removeSync(s3dir);
      });
  });

  it("puts a report file to S3 by json", () => {
    const key = "output.json"
    const reporter = new S3JsonReporter(s3, bucketName, key);
    const data = { message: "test" };
    const expected = { results: [data] };
    reporter.open();
    reporter.write(data);
    return reporter.close()
      .then(() => {
        return s3.getObject({ Bucket: bucketName, Key: key }).promise();
      })
      .then((result: any) => {
        assert.deepEqual(expected, JSON.parse(result.Body.toString()));
      });
  });

  it("puts a report file to s3 by csv", () => {
    const key = "output.csv"
    const reporter = new S3CsvReporter(s3, bucketName, key);
    const data = { message: "test" };
    const expected = [data];
    reporter.open();
    reporter.write(data);
    return reporter.close()
      .then(() => {
        return s3.getObject({ Bucket: bucketName, Key: key }).promise();
      })
      .then((result: any) => {
        return csv().fromString(result.Body.toString());
      })
      .then((result: any) => {
        assert.deepEqual(expected, result);
      });
  });
});
