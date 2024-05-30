import { config } from 'dotenv';
import { serve } from './modules/serve';
import { Checker } from './classes/Checker';
import { Logger, logger } from './classes/Logger';
import { Constants } from './constants';
import { dialog, welcome } from './utils';
import { parseOptions, showHelp } from './modules/cli';

config({ override: true });

let interval: Nullable<NodeJS.Timeout> = null;

async function main() {
    welcome(true);
    logger().newLine({ toFile: false });
    const checker = new Checker();
    try {
        await serve(checker);
        interval = setInterval(async () => await serve(checker), Constants.defaultCheckIntervalMs);
    } catch (error) {
        logger().log(`${error}`).newLine();
        return;
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