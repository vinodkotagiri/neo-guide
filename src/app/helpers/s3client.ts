import AWS from 'aws-sdk';

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const S3_REGION = process.env.NEXT_PUBLIC_S3_REGION;


AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3({
  params:{Bucket: S3_BUCKET},
  region: S3_REGION,
});

export {s3, S3_BUCKET};