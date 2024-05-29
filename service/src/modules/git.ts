import { simpleGit, SimpleGit } from 'simple-git';
import { Errors } from '../constants';

const git: SimpleGit = simpleGit();

export default async function commitAndPush(message: string): Promise<void> {
    if (!process.env.USER) throw Error(Errors.envUser);
    if (!process.env.TOKEN) throw Error(Errors.envToken);
    if (!process.env.REPO) throw Error(Errors.envRepo);
    const auth = `${process.env.USER}:${process.env.TOKEN}`;
    const userRepo = `${process.env.USER}/${process.env.REPO}`;
    git
        .pull('origin', 'master')
        .add(globalThis.dataPath)
        .commit(message)
        .push(`https://${auth}@github.com/${userRepo}`, 'master');
}