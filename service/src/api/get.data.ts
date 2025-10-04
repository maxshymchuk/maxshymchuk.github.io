import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Const } from '../constants';

const contacts = (await import('../data/contacts.json')).default;

async function getData(): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    return { user, contacts, repositories: filtered };
}

export { getData };
