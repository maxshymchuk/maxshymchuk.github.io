import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Const } from '../constants';

async function getData(): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    const custom: Custom = {
        links: {
            github: process.env.GITHUB,
            linkedin: process.env.LINKEDIN,
            telegram: process.env.TELEGRAM,
            notion: process.env.NOTION,
            email: process.env.EMAIL,
        },
    };

    return { user, repositories: filtered, custom };
}

export { getData };
