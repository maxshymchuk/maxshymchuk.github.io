import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { serve } from './src/serve.ts';
import { resolve, join } from 'path';
import { timestampToDate } from './src/utils.ts';
import Checker from './src/classes/Checker.ts';

config({ override: true });

const rootPath = resolve(join('..'));
const dataPath = resolve(`${rootPath}/client/public/data.json`);
const logPath = resolve(`${rootPath}/service/log.txt`);

let interval = null;

const CHECK_INTERVAL = 30000;
const REQUEST_INTERVAL = 3600000;

async function init() {
    const result = await readFile(dataPath);
    const { meta } = JSON.parse(result.toString()) as Data;
    console.clear();
    console.log('Check interval:'.padEnd(25), `${CHECK_INTERVAL}ms (~${Math.round(CHECK_INTERVAL / 1000)}s)`);
    console.log('Request interval:'.padEnd(25), `${REQUEST_INTERVAL}ms (~${Math.round(REQUEST_INTERVAL / 3600000)}h)`);
    console.log('Last time updated at:'.padEnd(25), `${timestampToDate(meta.last_updated)}`);
    console.log('Data file path:'.padEnd(25), `${dataPath}`);
    console.log('Log file path:'.padEnd(25), `${logPath}\n`);
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