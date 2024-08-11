import { getAllRepos } from './getAllRepos';
import { getUser } from './getUser';
import { Constants, Errors } from '../../constants';

async function getUserData(): Promise<UserData> {
    if (!process.env.USER) throw Error(Errors.envUser);

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);

    const repositories = await getAllRepos(user.repos_url);

    const filtered: Array<MappedRepo> = [];
    for (let repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Constants.repoExcludeTopic)) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getUserData };