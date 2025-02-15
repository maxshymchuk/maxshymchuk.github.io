const Const = {
    RepoExcludeTopic: 'repo-exclude',
    DefaultDataPath: 'data.json',
    DefaultLogPath: 'history.log',
    DefaultCheckIntervalMs: 1000, // 1 sec
    DefaultRequestIntervalMs: 3600000, // 1 hour

    Error: {
        EnvUser: '.env USER not found',
        EnvToken: '.env TOKEN not found',
        EnvGistId: '.env GIST_ID not found',
        EnvGistFile: '.env GIST_FILE not found',
    },
};

export { Const };
