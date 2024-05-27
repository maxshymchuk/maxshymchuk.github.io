import { simpleGit, SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit();

export default async function commitAndPush(message: string): Promise<void> {
    if (!process.env.USER || !process.env.TOKEN || !process.env.REPO) return;
    try {
        git
            .add(globalThis.dataPath)
            .commit(message)
            .push(`https://${process.env.USER}:${process.env.TOKEN}@github.com/${process.env.USER}/${process.env.REPO}`, 'master');
    } catch (error) {
        console.log(error);
    }
}