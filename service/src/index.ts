import { config } from 'dotenv';
import { createInterface } from 'node:readline/promises';
import { readFile } from 'fs/promises';
import { serve } from './modules/serve';
import Checker from './classes/Checker';
import { logger } from './classes/Logger';
import { Command } from 'commander';
import { Constants } from './constants';
import { welcome } from './utils';

config({ override: true });

let interval: Nullable<NodeJS.Timeout> = null;

const program = new Command();

program
    .name('service')
    .helpOption(false)
    .option('-d, --data-path <string>', 'path to data.json', Constants.defaultDataPath)
    .option('-l, --log-path <string>', 'path to log.txt', Constants.defaultLogPath)
    .option('-r, --request-interval <number>', 'interval between requests to a server (s)', Constants.defaultRequestInterval)
    .option('-c, --check-interval <number>', 'interval to check if request time has come (s)', Constants.defaultCheckInterval)
    .option('-y, --yes', 'pass this flag to start immediately');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function askToStart() {
    const yes = ['y', 'Y'];
    const no = ['n', 'N'];
    program.outputHelp();
    logger().newLine({ toFile: false });
    welcome();
    logger().newLine({ toFile: false });
    let answer = -1;
    while (answer === -1) {
        const userAnswer = await rl.question('Continue? (Y / N) ');
        if (yes.includes(userAnswer)) answer = 1;
        if (no.includes(userAnswer)) answer = 0;
    }
    rl.close();
    if (answer === 0) process.exit(0);
}

async function main() {
    welcome(true);
    logger().newLine({ toFile: false });
    try {
        const result = await readFile(globalThis.dataPath);
        const { meta } = JSON.parse(result.toString()) as Data;
        const checker = new Checker(meta.last_updated, meta.snapshot);
        await serve(checker);
        interval = setInterval(async () => await serve(checker), globalThis.checkInterval);
    } catch (error) {
        logger().log(`${error}`).newLine();
        return;
    }
}

async function init() {
    logger().clearScreen();
    program.parse();

    const { dataPath, logPath, checkInterval, requestInterval, yes } = program.opts();

    globalThis.dataPath = dataPath;
    globalThis.logPath = logPath;
    globalThis.checkInterval = +checkInterval * 1000;
    globalThis.requestInterval = +requestInterval * 1000;

    if (!yes) await askToStart();

    await main();
}

await init();