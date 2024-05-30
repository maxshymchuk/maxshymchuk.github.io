import { dirname } from 'path';
import { fileURLToPath } from 'url';

namespace Global {
    export const __filename = fileURLToPath(import.meta.url);
    export const __dirname = dirname(__filename);
}

namespace Constants {
    export const defaultDataPath = 'data.json';
    export const defaultLogPath = 'history.log';
    export const defaultCheckIntervalMs = 1000; // 1 sec
    export const defaultRequestIntervalMs = 3600000; // 1 hour
}

namespace Errors {
    export const envUser = '.env USER not found';
    export const envToken = '.env TOKEN not found';
    export const envRepo = '.env REPO not found';
}

export { Constants, Errors, Global };