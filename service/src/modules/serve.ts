import { writeFile } from 'fs/promises';
import { serialize, stringify } from '../utils';
import { Checker } from '../classes/Checker';
import { getUserData, updateGist } from './api';
import { logger } from '../classes/Logger';

function logInline(text: unknown) {
    return logger().log(` -> ${text}`, { withTimestamp: false }).newLine();
}

async function serve(checker: Checker): Promise<void> {
    logger().fromStartScreen().log('Checking', { toFile: false });
    if (checker.isUpToDate) return;
    checker.timestamp = Date.now();
    logger().fromStartScreen().log('Request attempt');
    try {
        const { user, repositories } = await getUserData();
        const snapshot = serialize(repositories);
        if (checker.isEqualSnapshot(snapshot)) {
            logInline('equal');
        } else {
            logInline('different');
            checker.snapshot = snapshot;
            const data = stringify({
                meta: { timestamp: checker.timestamp, snapshot: checker.snapshot },
                data: { user, repositories }
            }, true);
            try {
                await writeFile(Checker.path, data);
                logger().log('Data update succeed').newLine();
            } catch (error) {
                logger().log(`Data update failed: ${error}`).newLine();
                return;
            }
            try {
                const { history } = await updateGist(data);
                logger().log('Gist update succeed').newLine();
                logger().log(`New version -> ${history[0].version}`, { toScreen: false }).newLine()
            } catch (error) {
                logger().log(`Gist update failed: ${error}`).newLine();
            }
        }
    } catch (error) {
        logInline(`${error}`);
        return;
    }
}

export { serve };