import { appendFile, writeFile } from 'fs/promises';
import { serialize, timestampToDate } from '../utils.js';
import { logInline } from './logging.js';
import Checker from '../classes/Checker.js';
import UserLoader from '../classes/UserLoader.js';
import RepoLoader from '../classes/RepoLoader.js';
import uploadToGit from './git.js';

async function serve(checker: Checker): Promise<void> {
    if (!process.env.USER) throw Error('.env USER is missing');

    logInline(`[${timestampToDate(Date.now())}] Checking`);

    if (checker.compareTimestamps(globalThis.requestInterval)) return;

    checker.timestamp = Date.now();

    logInline(`[${checker.formattedDate}] Request attempt`)

    try {
        const user = await UserLoader.get(`https://api.github.com/users/${process.env.USER}`);
        const repositories = await RepoLoader.get(user.repos_url);
        const filtered = repositories.filter(repo => repo.name !== process.env.USER && repo.name !== `${process.env.USER}.github.io`);
        const newSnapshot = serialize(filtered);
        if (checker.compareSnapshots(newSnapshot)) {
            logInline(' - Snapshots are equal\n', false);
        } else {
            logInline(' - Snapshots are different\n', false);
            checker.snapshot = newSnapshot;
            const newData: Data = {
                meta: { last_updated: checker.timestamp, snapshot: checker.snapshot },
                data: { user, repositories: filtered }
            }
            await writeFile(globalThis.dataPath, JSON.stringify(newData, null, '    '));
            await uploadToGit(checker, globalThis.dataPath);
            await appendFile(globalThis.logPath, `[${checker.formattedDate}] ${checker.snapshot}\n`);
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

export { serve };