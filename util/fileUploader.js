import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import fs from "fs";

class FileUploader {
  constructor(file, docType) {
    this.file = file;
    const fileContent = fs.readFileSync(file.path);

    const date = new Date();
    this.keyName = `${docType}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/${
      file.name
    }`;

    this.params = {
      Bucket: process.env.AWS_BUCKET_FPB,
      Key: this.keyName,
      Body: fileContent,
    };
  }

  async upload() {
    await this._upload();

    return {
      fileName: this.file.name,
      fileType: this.file.type,
      fileSize: this.file.size,
      fileKey: this.keyName,
    };
  }

  async _upload() {
    try {
      await s3Client.send(new PutObjectCommand(this.params));
      console.log(
        "Successfully created " +
          this.params.Key +
          " and uploaded it to " +
          this.params.Bucket +
          "/" +
          this.params.Key
      );
    } catch (err) {
      console.log("file upload to s3 error *** ", err);
    }
  }
}

export default FileUploader;
