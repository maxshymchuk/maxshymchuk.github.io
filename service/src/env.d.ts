declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REDIS_URL: string;
            GH_TOKEN?: string;
        }
    }
}

export {};
