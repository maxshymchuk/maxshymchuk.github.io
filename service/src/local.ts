import { config } from 'dotenv';
import { serve } from './modules/serve.js';
import { Checker } from './classes/Checker.js';
import { Logger, logger } from './classes/Logger.js';
import { Constants } from './constants.js';
import { dialog, welcome } from './utils.js';
import { parseOptions, showHelp } from './modules/cli/index.js';
import { readFile } from 'fs/promises';

config({ override: true });

async function main() {
    welcome(true);
    logger().newLine({ toFile: false });
    let result: Nullable<string> = null;
    try {
        const buffer = await readFile(Checker.path);
        result = buffer.toString();
    } catch (error) {
        logger().log(`${error}`).newLine();
    } finally {
        const checker = new Checker(result ? JSON.parse(result) as Data : null);
        while (true) {
            const before = Date.now();
            await serve(checker);
            const diff = Constants.defaultCheckIntervalMs - Date.now() + before;
            await new Promise((resolve) => setTimeout(resolve, Math.max(0, diff)));
        }
    }
}

async function init() {
    logger().clearScreen();
    try {
        const { dataPath, logPath, requestInterval, skip } = await parseOptions();

        Checker.path = dataPath;
        Checker.requestInterval = requestInterval < Constants.defaultRequestIntervalMs
            ? Constants.defaultRequestIntervalMs
            : requestInterval;
        Logger.path = logPath;

        showHelp();

        if (!skip) {
            const positive = await dialog('Continue? (Y / N) ', ['y', 'Y'], ['n', 'N']);
            if (!positive) process.exit(0);
        }

        await main();
    } catch (error) {
        logger(true, false, false).log(`${error}`).newLine();
        process.exit(0);
    }
}

await init();