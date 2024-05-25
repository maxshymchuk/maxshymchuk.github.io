import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { serve } from './src/serve.ts';
import { resolve, join } from 'path';
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