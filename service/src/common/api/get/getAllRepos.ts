import { getLatestRelease } from './getLatestRelease';
import { get } from '../share';

function mapRepo(repo: Repo, release?: Nullable<Release>): MappedRepo {
    return {
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        site: repo.homepage || null,
        release: release?.html_url || null,
        page: repo.html_url,
        topics: repo.topics,
        archived: repo.archived
    };
}

async function getAllRepos(url: string): Promise<Array<MappedRepo>> {
    const reposResponse = await get(url);
    const repos = await reposResponse.json() as Array<Repo>;
    return Promise.all(repos.map(async (repo) => {
        const latestRelease = await getLatestRelease(repo.releases_url.replace('{/id}', ''));
        return mapRepo(repo, latestRelease);
    }));
}

export { getAllRepos };