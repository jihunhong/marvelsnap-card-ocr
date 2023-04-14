declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";
    CLOUD_VISION_API_KEY: string;
  }
}
