import { config } from 'dotenv';
import { serve } from './modules/serve';
import { Checker } from './classes/Checker';
import { Logger, logger } from './classes/Logger';
import { Constants } from './constants';
import { dialog, serialize, stringify, welcome } from './utils';
import { parseOptions, showHelp } from './modules/cli';
import { readFile, writeFile } from 'fs/promises';
import { getUserData } from './modules/api';

config({ override: true });

let interval: Nullable<NodeJS.Timeout> = null;

async function main() {
    welcome(true);
    logger().newLine({ toFile: false });
    try {
        const buffer = await readFile(Checker.path);
        let result: string;
        if (buffer.length === 0) {
            logger().log('File is empty, loading initial data', { toFile: false }).newLine();
            const { user, repositories } = await getUserData();
            const data = stringify({
                meta: { timestamp: Date.now(), snapshot: serialize(repositories) },
                data: { user, repositories }
            }, true);
            await writeFile(Checker.path, data);
            result = data;
        } else {
            result = buffer.toString();
        }
        const { meta } = JSON.parse(result) as Data;
        const checker = new Checker(meta.timestamp, meta.snapshot);
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