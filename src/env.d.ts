declare namespace NodeJS {
  export interface ProcessEnv {
    OPENAI_API_KEY: string;
    OPENAI_Organization: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    SERVER_PORT: number;
    CLOUD_NAME: string
    API_KEY_CLOUDFLARE: string
    API_SECRET: string
    COOKIE_NAME: string
  }
}
