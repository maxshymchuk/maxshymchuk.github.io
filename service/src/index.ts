import { config } from 'dotenv';
import { createInterface } from 'node:readline/promises';
import { readFile } from 'fs/promises';
import { serve } from './modules/serve';
import { Checker } from './classes/Checker';
import { logger } from './classes/Logger';
import { Constants } from './constants';
import { welcome } from './utils';
import { program, validateArgs } from './modules/cli';

config({ override: true });

let interval: Nullable<NodeJS.Timeout> = null;

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
        const result = await readFile(Checker.path);
        const resultStr = result.toString();
        if (!resultStr) throw Error('Data file is empty');
        const { meta } = JSON.parse(resultStr) as Data;
        if (!meta) throw Error('Data file has wrong structure');
        const checker = new Checker(meta.last_updated, meta.snapshot);
        await serve(checker);
        interval = setInterval(async () => await serve(checker), Constants.defaultCheckIntervalMs);
    } catch (error) {
        logger().log(`${error}`).newLine();
        return;
    }
}

async function init() {
    logger().clearScreen();

    const isValid = await validateArgs();
    if (!isValid) process.exit(0);

    logger().newLine({ toFile: false });

    const { yes } = program.opts();
    if (!yes) await askToStart();

    await main();
}

await init();