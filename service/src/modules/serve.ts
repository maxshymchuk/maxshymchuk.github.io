import { writeFile } from 'fs/promises';
import { serialize, stringify } from '../utils';
import Checker from '../classes/Checker';
import commitAndPush from './git';
import { getRepos, getUser } from './api';
import { logger } from '../classes/Logger';

function logInline(text: unknown) {
    return logger().log(` -> ${text}`, { withTimestamp: false });
}

async function serve(checker: Checker): Promise<void> {
    if (!process.env.USER) throw Error('.env USER is missing');

    logger().fromStartScreen().log('Checking', { toFile: false });

    if (checker.compareTimestamps(globalThis.requestInterval)) return;

    checker.timestamp = Date.now();

    logger().fromStartScreen().log('Request attempt');

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`, logInline);
    if (!user) return;

    const repositories = await getRepos(user.repos_url, logInline);
    if (!repositories) return;

    const filtered = repositories.filter(repo => repo.name !== process.env.USER && repo.name !== `${process.env.USER}.github.io`);
    const newSnapshot = serialize(filtered);

    if (checker.compareSnapshots(newSnapshot)) {
        logInline(' -> equal').newLine();
    } else {
        logInline(' -> different').newLine();
        checker.snapshot = newSnapshot;
        const newData: Data = {
            meta: { last_updated: checker.timestamp, snapshot: checker.snapshot },
            data: { user, repositories: filtered }
        }
        try {
            logger().log('Data update started').newLine();
            await writeFile(globalThis.dataPath, stringify(newData, true));
            logger().log('Data update succeed').newLine();
        } catch (error) {
            logger().log(`Data update failed: ${error}`).newLine();
            return;
        }
        try {
            logger().log('Git upload started').newLine();
            await commitAndPush(`Update static data. Timestamp: ${checker.timestamp}`);
            logger().log('Git upload succeed').newLine();
        } catch (error) {
            logger().log(`Git upload failed: ${error}`).newLine();
        }
        logger().log(` ${stringify(newData)}`, { toScreen: false }).newLine()
    }
}

export { serve };