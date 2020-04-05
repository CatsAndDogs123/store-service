import * as AWS from 'aws-sdk';

// 10mb part size
const PART_SIZE = 10 * 1024 * 1024;
//upload concurrency
const QUEUE_SIZE = 1;

interface Credentials {
  endPoint: string;
  accessKey: string;
  secretAccessKey: string;
  bucket: string;
}

export default class S3 {
  private conn;
  private disableWrite;

  constructor(
    private readonly cred: Credentials = {
      endPoint: process.env.OS_END_POINT,
      accessKey: process.env.OS_ACCESS_KEY,
      secretAccessKey: process.env.OS_SECRET_ACCESS_KEY,
      bucket: process.env.OS_BUCKET
    },
    disableWrite = false,
    s3ForcePathStyle = true
  ) {
    this.disableWrite = disableWrite;
    this.conn = new AWS.S3({
      params: {
        Bucket: cred.bucket
      },
      endpoint: cred.endPoint,
      accessKeyId: cred.accessKey,
      secretAccessKey: cred.secretAccessKey,
      s3ForcePathStyle,
      sslEnabled: false,
      computeChecksums: false,
      convertResponseTypes: false,
      s3DisableBodySigning: true,
      signatureVersion: 'v4'
    });
  }

  errorHandler = error => {
    console.log('Something went wrong with s3', error);
  };

  async start() {
    try {
      await this.conn.headBucket().promise();
    } catch (e) {
      if (e.statusCode == 404) {
        await this.conn.createBucket().promise();
      } else {
        throw e;
      }
    }
  }

  // key = name inside bucket
  putObject(key, body) {
    if (!this.disableWrite) {
      return this.conn
        .putObject({ Key: key, Body: body })
        .promise()
        .catch(this.errorHandler);
    } else {
      return Promise.resolve();
    }
  }

  upload(key, body) {
    if (!this.disableWrite) {
      return this.conn
        .upload({ Key: key, Body: body }, { partSize: PART_SIZE, queueSize: QUEUE_SIZE })
        .promise()
        .catch(this.errorHandler);
    } else {
      return Promise.resolve();
    }
  }

  getObject(key) {
    return this.conn
      .getObject({ Key: key })
      .promise()
      .catch(this.errorHandler);
  }

  listObjects(prefix) {
    return this.conn
      .listObjects({ Prefix: prefix })
      .promise()
      .catch(this.errorHandler);
  }

  getConnection() {
    return this.conn;
  }
}
