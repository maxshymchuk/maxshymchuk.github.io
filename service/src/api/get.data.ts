import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Const } from '../constants';

async function getData(): Promise<UserData> {
    if (!process.env.USER) throw Error(Const.Error.EnvUser);

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);

    const repositories = await getRepos(user.repos_url);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getData };
