import { getAllRepos } from './getAllRepos';
import { getUser } from './getUser';

async function getUserData(): Promise<UserData> {
    if (!process.env.USER) throw Error('.env USER not found');

    const user = await getUser(`https://api.github.com/users/${process.env.USER}`);

    const repositories = await getAllRepos(user.repos_url);

    const filtered: Array<MappedRepo> = [];
    for (let repo of repositories) {
        if (repo.name === process.env.USER) continue;
        filtered.push(repo);
    }

    return { user, repositories: filtered };
}

export { getUserData };