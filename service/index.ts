import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { serve } from './src/serve.ts';
import { resolve, join } from 'path';
import { logKeyValue, timestampToDate } from './src/utils.ts';
import Checker from './src/classes/Checker.ts';

config({ override: true });

const rootPath = resolve(join('..'));
const dataPath = resolve(`${rootPath}/client/public/data.json`);
const logPath = resolve(`${rootPath}/service/log.txt`);

let interval: Nullable<NodeJS.Timeout> = null;

const CHECK_INTERVAL = 30000;
const REQUEST_INTERVAL = 3600000;

async function init() {
    const result = await readFile(dataPath);
    const { meta } = JSON.parse(result.toString()) as Data;
    console.clear();
    logKeyValue('Check interval:', `${CHECK_INTERVAL}ms (~${Math.round(CHECK_INTERVAL / 1000)}s)`);
    logKeyValue('Request interval:', `${REQUEST_INTERVAL}ms (~${Math.round(REQUEST_INTERVAL / 3600000)}h)`);
    logKeyValue('Last time updated at:', `${timestampToDate(meta.last_updated)}`);
    logKeyValue('Data file path:', dataPath);
    logKeyValue('Log file path:', logPath, true);
    const checker = new Checker(meta.last_updated, meta.snapshot);
    serve(checker);
    interval = setInterval(() => serve(checker), CHECK_INTERVAL);
}

init();

export {
    CHECK_INTERVAL,
    REQUEST_INTERVAL,
    rootPath,
    dataPath,
    logPath
};