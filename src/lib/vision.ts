import axios from "axios";
import { API_KEY } from "../config";

/**
 * Detects text from images provided by URL using Google Cloud Vision API
 * @param {string} url image Url
 * @param {string} key This refers to the Google Cloud Vision API Key, which can also be set as process.env.CLOUD_VISION_API_KEY
 *
 * @returns {Array<AnnotationItem>} detected responses
 */
export async function singleDetect({
  url,
  key,
}: {
  url: string;
  key?: string;
}): Promise<[null | Array<AnnotationItem>]> {
  try {
    const response = await axios.post(
      "https://vision.googleapis.com/v1/images:annotate",
      {
        requests: [
          {
            image: {
              source: {
                imageUri: url,
              },
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      },
      {
        params: {
          key: key || API_KEY,
        },
      }
    );
    const data: DetectResponse = response.data;
    if (data.responses.length) {
      return [data.responses?.[0]?.textAnnotations];
    }
    console.warn(`[warn] detected empty data string on url : ${url}`);
    return [null];
  } catch (err: any) {
    console.error(`[error] ${err.response.data.error.message}`);
    return [null];
  }
}
