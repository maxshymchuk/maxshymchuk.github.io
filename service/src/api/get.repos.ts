import { get } from './share';

function mapRepo(repo: Repo, release?: Nullable<Release>): MappedRepo {
    return {
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        site: repo.homepage || null,
        release: release?.html_url || null,
        page: repo.html_url,
        topics: repo.topics,
        archived: repo.archived,
    };
}

async function getRepos(url: string): Promise<Array<MappedRepo>> {
    const reposResponse = await get(url);
    const repos = (await reposResponse.json()) as Array<Repo>;
    return Promise.all(
        repos.map(async (repo) => {
            const releasesResponse = await get(repo.releases_url.replace('{/id}', ''));
            const releases = (await releasesResponse.json()) as Array<Release>;
            return mapRepo(repo, releases.length > 0 ? releases[0] : null);
        }),
    );
}

export { getRepos };
