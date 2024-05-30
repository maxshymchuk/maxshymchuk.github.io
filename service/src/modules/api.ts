import { Errors } from '../constants';

async function get(url: string): Promise<Response> {
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    });
}

async function getUser(url: string): Promise<MappedUser> {
    const userResponse = await get(url);
    const user = await userResponse.json() as User;
    return {
        login: user.login,
        name: user.name || null,
        bio: user.bio || null,
        email: user.email || null,
        repos_url: user.repos_url
    };
}

async function getLatestRelease(url: string): Promise<Nullable<Release>> {
    const releasesResponse = await get(url);
    const releases = await releasesResponse.json() as Array<Release>;
    return releases.length > 0 ? releases[0] : null;
}

async function getAllRepos(url: string): Promise<Array<MappedRepo>> {
    const reposResponse = await get(url);
    const repos = await reposResponse.json() as Array<Repo>;
    return Promise.all(repos.map(async (repo) => {
        const latestRelease = await getLatestRelease(repo.releases_url.replace('{/id}', ''));
        return {
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            site: repo.homepage || null,
            release: latestRelease?.html_url || null,
            page: repo.html_url,
            archived: repo.archived
        };
    }));
}

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