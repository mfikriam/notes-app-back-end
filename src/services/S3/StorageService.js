const AWS = require('aws-sdk');

class StorageService {
  constructor() {
    this._S3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // ? The name of the S3 Bucket used
      Key: +new Date() + meta.filename, // ? The name of the file to be saved
      Body: file._data, // ? buffer
      ContentType: meta.headers['content-type'], // ? MIME Type of file to be saved
    };

    return new Promise((resolve, reject) => {
      this._S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
