import { Constants } from '../../constants';
import { Logger, logger } from '../../classes/Logger';
import { Checker } from '../../classes/Checker';
import { resolve } from 'path';
import { access, appendFile } from 'fs/promises';
import { program } from './program';

async function validateArgs(): Promise<boolean> {
    program.parse();

    const { dataPath, logPath, requestInterval } = program.opts();

    try {
        if (dataPath === undefined) throw 'Data file path is unset';
        const path = resolve(dataPath);
        await access(path);
        Checker.path = path;
    } catch (error) {
        logger(true, false, false).log(`${error}`).newLine()
        return false;
    }

    try {
        if (requestInterval === undefined) throw 'Request interval is unset';
        if (isNaN(requestInterval)) throw Error('Request interval value is not a number');
        const value = +requestInterval;
        if (value < Constants.defaultRequestIntervalMs) throw 'Request interval is less than 1 hour';
    } catch (error) {
        logger(true, false, false)
            .log(`${error}`).newLine()
            .log(`Using default request interval: ${Checker.requestInterval}`).newLine();
    }

    try {
        if (logPath === undefined) throw 'Log file path is unset';
        const path = resolve(logPath);
        await appendFile(path, '');
        Logger.path = path;
    } catch (error) {
        await appendFile(Logger.path, '');
        logger(true, false, false)
            .log(`${error}`).newLine()
            .log(`Using default path for log file: ${Logger.path}`).newLine();
    }

    return true;
}

export { validateArgs };