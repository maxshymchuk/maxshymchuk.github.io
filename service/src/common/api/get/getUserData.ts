import { getAllRepos } from './getAllRepos';
import { getUser } from './getUser';
import { Const } from '../../constants';

async function getUserData(): Promise<UserData> {
    if (!process.env.USER) throw Error(Const.Error.EnvUser);

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);

    const repositories = await getAllRepos(user.repos_url);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getUserData };
