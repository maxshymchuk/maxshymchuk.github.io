namespace Constants {
    export const repoExcludeTopic = 'repo-exclude';
    export const defaultDataPath = 'data.json';
    export const defaultLogPath = 'history.log';
    export const defaultCheckIntervalMs = 1000; // 1 sec
    export const defaultRequestIntervalMs = 3600000; // 1 hour
}

namespace Errors {
    export const envUser = '.env USER not found';
    export const envToken = '.env TOKEN not found';
    export const envGistId = '.env GIST_ID not found';
    export const envGistFile = '.env GIST_FILE not found';
}

export { Constants, Errors };