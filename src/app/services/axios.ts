import axios from "axios";
import { UploadVideoPayload } from "./payloads/payloads";
import { UploadVideoResponse } from "./responses/responses";
const BASE_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: BASE_URL
});

// const INITIATE_SCREEN_RECORD = "/record/initiate";
const UPLOAD_FILE = "/upload";
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
  return new Promise((resolve) => {
    api
      .post(UPLOAD_FILE, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log('error uploading file', error);
        resolve(null)
      });
  });
}

export default api;
