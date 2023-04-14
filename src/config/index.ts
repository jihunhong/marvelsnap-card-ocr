import dotenv from "dotenv";
dotenv.config();

export const API_END_POINT = "https://vision.googleapis.com/v1/images:annotate";
export const CARD_API_END_POINT = process.env.CARD_API_ENDPOINT;
export const API_KEY = process.env.CLOUD_VISION_API_KEY;
export const DISTANCE_THRESHOLD = 0.25;
