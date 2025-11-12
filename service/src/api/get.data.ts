import { getRepos } from './get.repos';
import { getUser } from './get.user';
import contacts from '../data/contacts.json';
import contactsCIS from '../data/contacts-cis.json';
import about from '../data/about.json';
import aboutCIS from '../data/about-cis.json';
import skills from '../data/skills.json';
import experiences from '../data/experiences.json';
import { Geo } from '@vercel/functions';

const CIS = ['AM', 'AZ', 'BY', 'KZ', 'KG', 'MD', 'RU', 'TJ', 'UZ'];

async function getData(geo: Geo): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const isCIS = Boolean(geo.country && CIS.includes(geo.country));

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        filtered.push(repo);
    }

    return {
        user,
        contacts: isCIS ? contactsCIS : contacts,
        about: isCIS ? aboutCIS : about,
        skills,
        experiences,
        repositories: filtered,
    };
}

export { getData };
