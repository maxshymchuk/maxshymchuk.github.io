import { simpleGit, SimpleGit } from 'simple-git';
import Checker from './classes/Checker.ts';

const git: SimpleGit = simpleGit();

export default async function uploadToGit(checker: Checker, filePath: string): Promise<void> {
    if (!process.env.USER || !process.env.TOKEN || !process.env.REPO) return;
    try {
        const a = await git.add(filePath)
            .commit(`Update static data. Timestamp: ${checker.timestamp}`)
            .push(`https://${process.env.USER}:${process.env.TOKEN}@github.com/${process.env.USER}/${process.env.REPO}`, 'master');
        console.log(a)
    } catch (error) {
        console.log(error);
    }
}