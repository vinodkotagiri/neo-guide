import aws from "aws-sdk";

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.NEXT_PUBLIC_S3_REGION;
export async function POST(request) {
  try {
    const { fileName, fileType } = await request.json();

    // Configure AWS S3
    aws.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION, // e.g., "us-east-1"
    });

    const s3 = new aws.S3();

    // Generate a pre-signed URL
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName, // Name of the file in S3
      Expires: 60, // URL expiration time in seconds
      ContentType: fileType,
      ACL: "public-read", // Optional: Make file publicly accessible
    };

    const signedUrl = await s3.getSignedUrlPromise("putObject", params);

    return new Response(
      JSON.stringify({
        signedUrl,
        fileUrl: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate signed URL" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
