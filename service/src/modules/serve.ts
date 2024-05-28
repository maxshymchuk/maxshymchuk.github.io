import { writeFile } from 'fs/promises';
import { serialize, stringify, timestampToDate } from '../utils.js';
import { logInline, logToFile } from './logging.js';
import Checker from '../classes/Checker.js';
import commitAndPush from './git.js';
import { getRepos, getUser } from './api';

async function serve(checker: Checker): Promise<void> {
    if (!process.env.USER) throw Error('.env USER is missing');

    logInline(`[${timestampToDate(Date.now())}] Checking`, true);

    if (checker.compareTimestamps(globalThis.requestInterval)) return;

    checker.timestamp = Date.now();

    logInline(`[${checker.formattedDate}] Request attempt`, true)

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);
    if (!user) return;
    const repositories = await getRepos(user.repos_url);
    if (!repositories) return;
    const filtered = repositories.filter(repo => repo.name !== process.env.USER && repo.name !== `${process.env.USER}.github.io`);
    const newSnapshot = serialize(filtered);
    if (checker.compareSnapshots(newSnapshot)) {
        logInline(' -> equal');
    } else {
        logInline(' -> different');
        checker.snapshot = newSnapshot;
        const newData: Data = {
            meta: { last_updated: checker.timestamp, snapshot: checker.snapshot },
            data: { user, repositories: filtered }
        }
        try {
            logInline('\n' + 'Update phase:'.padEnd(25));
            await writeFile(globalThis.dataPath, stringify(newData, true));
            logInline('Success');
        } catch (error) {
            logInline(`${error}\n`);
            return;
        }
        try {
            logInline('\n' + 'Commit phase:'.padEnd(25));
            await commitAndPush(`Update static data. Timestamp: ${checker.timestamp}`);
            logInline('Success');
        } catch (error) {
            logInline(`${error}`);
        }
        try {
            logInline('\n' + 'Log phase:'.padEnd(25));
            await logToFile(`[${checker.formattedDate}] ${stringify(newData)}\n`);
            logInline('Success');
        } catch (error) {
            logInline(`${error}`);
        }
    }
    logInline('\n');
}

export { serve };