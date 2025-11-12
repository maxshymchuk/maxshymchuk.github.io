import { getRepos } from './get.repos';
import { getUser } from './get.user';

async function getData(): Promise<DynamicData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getData };
