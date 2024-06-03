import { Errors } from '../../constants';
import { getAllRepos } from './getAllRepos';
import { getUser } from './getUser';

async function getUserData(): Promise<UserData> {
    if (!process.env.USER) throw Error(Errors.envUser);

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);

    const repositories = await getAllRepos(user.repos_url);

    const filtered: Array<MappedRepo> = [];
    for (let repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.name === `${process.env.USER}.github.io`) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getUserData };