import { config } from 'dotenv';
import { serve } from '../common/modules/handler/serve';
import { Checker } from '../common/classes/Checker';
import { Logger, logger } from '../common/classes/Logger';
import { Constants } from '../common/constants';
import { dialog, welcome } from '../common/utils';
import { parseOptions, showHelp } from '../common/modules/cli';
import { readFile } from 'fs/promises';
import EventEmitter from 'events';

config({ override: true });

const eventEmitter = new EventEmitter();

eventEmitter.on('loop', async (checker: Checker) => {
    const before = Date.now();
    await serve(checker);
    const diff = Constants.defaultCheckIntervalMs - Date.now() + before;
    setTimeout(() => eventEmitter.emit('loop', checker), Math.max(0, diff));
});

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
        eventEmitter.emit('loop', checker);
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