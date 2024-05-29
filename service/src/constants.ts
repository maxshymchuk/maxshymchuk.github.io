import { join, resolve } from 'path';

namespace Constants {
    export const rootPath = resolve(join('..'));
    export const defaultDataPath = resolve(`${rootPath}/client/public/data.json`);
    export const defaultLogPath = resolve(`${rootPath}/service/log.txt`);
    export const defaultCheckInterval = '10';
    export const defaultRequestInterval = '3600';
}

namespace Errors {
    export const envUser = '.env USER not found';
    export const envToken = '.env TOKEN not found';
    export const envRepo = '.env REPO not found';
}

export { Constants, Errors };