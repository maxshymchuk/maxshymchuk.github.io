import { logInline } from './logging';

async function get(url: string): Promise<Response> {
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    });
}

async function getUser(url: string): Promise<Nullable<MappedUser>> {
    try {
        const userResponse = await get(url);
        const user = await userResponse.json() as User;
        return {
            login: user.login,
            name: user.name || null,
            bio: user.bio || null,
            email: user.email || null,
            repos_url: user.repos_url
        };
    } catch (error) {
        logInline(` -> ${error}\n`);
        return null;
    }
}

async function getLatestRelease(url: string): Promise<Nullable<Release>> {
    try {
        const releasesResponse = await get(url);
        const releases = await releasesResponse.json() as Array<Release>;
        return releases.length > 0 ? releases[0] : null;
    } catch (error) {
        logInline(` -> ${error}\n`);
        return null;
    }
}

async function getRepos(url: string): Promise<Nullable<Array<MappedRepo>>> {
    try {
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
    } catch (error) {
        logInline(` -> ${error}\n`);
        return null;
    }
}

export {
    getRepos,
    getUser,
    getLatestRelease
}