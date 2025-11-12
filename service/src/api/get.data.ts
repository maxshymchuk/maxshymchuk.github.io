import { getRepos } from './get.repos';
import { getUser } from './get.user';
import { Geo } from '@vercel/functions';
import { getStaticDataByCountry } from '../../../share';

async function getData(geo: Geo): Promise<UserData> {
    const [user, repositories] = await Promise.all([getUser(), getRepos()]);

    const filtered: Array<MappedRepo> = [];
    for (const repo of repositories) {
        if (repo.name === process.env.USER) continue;
        filtered.push(repo);
    }

    const staticData = getStaticDataByCountry(geo.country);

    return {
        ...staticData,
        user,
        repositories: filtered,
    };
}

export { getData };
