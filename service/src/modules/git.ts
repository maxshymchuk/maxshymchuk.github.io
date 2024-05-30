import { simpleGit, SimpleGit } from 'simple-git';
import { Errors } from '../constants';
import { Checker } from '../classes/Checker';

const git: SimpleGit = simpleGit();

export default async function commitAndPush(message: string): Promise<void> {
    if (!process.env.USER) throw Error(Errors.envUser);
    if (!process.env.TOKEN) throw Error(Errors.envToken);
    if (!process.env.REPO) throw Error(Errors.envRepo);
    // git
    //     // .pull('origin', 'master')
    //     .add(Checker.path)
    //     .commit(message)
    //     .push(`https://${process.env.USER}:${process.env.TOKEN}@${process.env.REPO}`, undefined, undefined, (err) => console.log(err));
}