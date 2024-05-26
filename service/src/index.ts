import { config } from 'dotenv';
import { createInterface } from 'node:readline/promises';
import { readFile } from 'fs/promises';
import { serve } from './modules/serve.js';
import { parseCLI } from './modules/cli.js';
import { logWelcome } from './modules/logging.js';
import Checker from './classes/Checker.js';

config({ override: true });

let interval: Nullable<NodeJS.Timeout> = null;

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function askToContinue() {
    const yes = ['y', 'Y'];
    const no = ['n', 'N'];
    const answer = await rl.question('Continue? (Y / N) ');
    if (yes.includes(answer)) return 1;
    if (no.includes(answer)) return 0;
    return -1;
}

async function main() {
    logWelcome();
    const result = await readFile(globalThis.dataPath);
    const { meta } = JSON.parse(result.toString()) as Data;
    const checker = new Checker(meta.last_updated, meta.snapshot);
    serve(checker);
    interval = setInterval(() => serve(checker), globalThis.checkInterval);
}

async function init() {
    console.clear();
    parseCLI();
    console.log('\nCurrent settings:\n')
    logWelcome(false);
    let answer = -1;
    while (answer === -1) {
        answer = await askToContinue();
    }
    rl.close();
    if (answer === 0) process.exit(0);
    main();
}

init();