import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Const } from '../constants';

async function getData(): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        if (repo.topics.includes(Const.RepoExcludeTopic)) continue;
        filtered.push(repo);
    }

    const links: Array<Link> = [];

    if (process.env.GITHUB) links.push({ key: 'github', title: 'Github', url: process.env.GITHUB });
    if (process.env.LINKEDIN) links.push({ key: 'linkedin', title: 'LinkedIn', url: process.env.LINKEDIN });
    if (process.env.TELEGRAM) links.push({ key: 'telegram', title: 'Telegram', url: process.env.TELEGRAM });
    if (process.env.NOTION) links.push({ key: 'notion', title: 'Notion', url: process.env.NOTION });
    if (process.env.EMAIL) links.push({ key: 'email', title: 'Email', url: process.env.EMAIL });

    return { user, repositories: filtered, custom: { links } };
}

export { getData };
