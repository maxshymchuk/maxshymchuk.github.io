import { getRepos } from './get.repos';
import { getUser } from './get.user';
import contacts from '../data/contacts.json';
import about from '../data/about.json';
import skills from '../data/skills.json';
import experiences from '../data/experiences.json';

async function getData(): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        filtered.push(repo);
    }

    return { user, contacts, about, skills, experiences, repositories: filtered };
}

export { getData };
