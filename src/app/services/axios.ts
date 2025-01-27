import axios from "axios";
import { UploadVideoPayload } from "./payloads/payloads";
import { UploadVideoResponse } from "./responses/responses";
import AWS from "aws-sdk";

const BASE_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: BASE_URL
});

// const INITIATE_SCREEN_RECORD = "/record/initiate";
// const UPLOAD_FILE = "/upload";
// const GET_TRANSCRIPT = "/video/trascription";
// const TRANSLATE_SCRIPT = "/api/translate";
// const DUB_VIDEO = "/dub";
// const ADD_SUBTIITLE = "/subtitles/add";
// const VIDEO_EDIT = "/video/edit";
// const GENERATE_ARTICLE = "/article/generate";
// const EDIT_ARTICLE = "/article/edit";
// const CREATE_GIF = "/gif/create";

export function initiateScreenRecord() {}
export async function uploadFile(payload: UploadVideoPayload): Promise<UploadVideoResponse | null> {
  try {
    AWS.config.update ({
      region: process.env.NEXT_PUBLIC_AWS_REGION as string,
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string
    });
    const s3 = new AWS.S3();
    console.log("payload:::", payload);
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET as string,
      Key: payload.file.name,
      Body: payload.file,
      ContentType: payload.file.type
    };
    const response = await s3.upload(params).promise();
    if(!response.Location) return null
    return { file_url: response.Location };
  } catch (error) {
    console.log("error uploading file:", error);
    return null;
  }
}

export default api;
