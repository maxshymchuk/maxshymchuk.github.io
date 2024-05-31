export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            USER: string;
            TOKEN: string;
            GIST_ID: string;
            GIST_FILE: string;
        }
    }
}