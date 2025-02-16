import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Const } from '../constants';

async function getData(): Promise<UserData> {
    const user = await getUser();
    const repositories = await getRepos();

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getData };
