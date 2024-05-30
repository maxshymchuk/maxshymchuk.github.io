import { writeFile } from 'fs/promises';
import { serialize, stringify } from '../utils';
import { Checker } from '../classes/Checker';
import commitAndPush from './git';
import { getUserData } from './api';
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
            const newData: Data = {
                meta: { timestamp: checker.timestamp, snapshot: checker.snapshot },
                data: { user, repositories }
            }
            try {
                await writeFile(Checker.path, stringify(newData, true));
                logger().log('Data update succeed').newLine();
            } catch (error) {
                logger().log(`Data update failed: ${error}`).newLine();
                return;
            }
            // try {
            //     await commitAndPush(`Update static data. Timestamp: ${checker.timestamp}`);
            //     logger().log('Git upload succeed').newLine();
            // } catch (error) {
            //     logger().log(`Git upload failed: ${error}`).newLine();
            // }
            logger().log(`${stringify(newData)}`, { toScreen: false }).newLine()
        }
    } catch (error) {
        logInline(`${error}`);
        return;
    }
}

export { serve };