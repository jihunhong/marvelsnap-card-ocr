import axios from "axios";
import { API_END_POINT, API_KEY } from "../config";

export async function singleDetect({
  url,
}: {
  url: string;
}): Promise<[null | Array<AnnotationItem>]> {
  try {
    const response = await axios.post(
      API_END_POINT,
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
          key: API_KEY,
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
    console.error(`[detect-error] ${err.response.data.error.message}`);
    return [null];
  }
}
