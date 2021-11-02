import { s3Client } from "./s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

class FileDownloader {
  constructor(s3Key, fileName) {
    this.params = {
      Bucket: process.env.AWS_BUCKET_FPB,
      Key: s3Key,
    };
    this.fileName = fileName;
  }

  async downloadUrl() {
    if (!this.params.Key) {
      console.log("the aws key is not present, can't download");
      return;
    }
    const command = new GetObjectCommand(this.params);
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }
}

export default FileDownloader;
