import { appendFile, writeFile } from 'fs/promises';
import { serialize, timestampToDate } from './utils.ts';
import { dataPath, logPath, REQUEST_INTERVAL } from '../index.ts';
import Checker from './classes/Checker.ts';
import UserLoader from './classes/UserLoader.ts';
import RepoLoader from './classes/RepoLoader.ts';
import uploadToGit from './git.ts';

async function serve(checker: Checker): Promise<void> {
    if (!process.env.USER) throw Error('.env USER is missing');

    console.log(`[${timestampToDate(Date.now())}] Checking`);

    if (checker.compareTimestamps(REQUEST_INTERVAL)) return;

    checker.timestamp = Date.now();

    console.log(`[${checker.formattedDate}] Request attempt`);

    try {
        const user = await UserLoader.get(`https://api.github.com/users/${process.env.USER}`);
        const repositories = await RepoLoader.get(user.repos_url);
        const filtered = repositories.filter(repo => repo.name !== process.env.USER && repo.name !== `${process.env.USER}.github.io`);
        const newSnapshot = serialize(filtered);
        if (checker.compareSnapshots(newSnapshot)) {
            console.log('Snapshots are equal');
        } else {
            console.log('Snapshots are different, updating the file');
            checker.snapshot = newSnapshot;
            const newData: Data = {
                meta: { last_updated: checker.timestamp, snapshot: checker.snapshot },
                data: { user, repositories: filtered }
            }
            await writeFile(dataPath, JSON.stringify(newData, null, '    '));
            await uploadToGit(checker, dataPath);
            await appendFile(logPath, `[${checker.formattedDate}] ${checker.snapshot}\n`);
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

export { serve };