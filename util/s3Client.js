import { S3Client } from "@aws-sdk/client-s3";

const config = {
  region: process.env.AWS_REGION_FPB,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_FPB,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_FPB,
  },
};
const s3Client = new S3Client(config);
export { s3Client };
