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
    if (!userResponse.ok) throw Error('Unable to load user');
    const user = await userResponse.json() as User;
    return {
        login: user.login,
        name: user.name || null,
        bio: user.bio || null,
        email: user.email || null,
        repos_url: user.repos_url
    };
}

async function getReleases(url: string): Promise<Array<Release>> {
    const releasesResponse = await get(url);
    if (!releasesResponse.ok) throw Error('Unable to load releases');
    return releasesResponse.json();
}

async function getRepos(url: string): Promise<Array<MappedRepo>> {
    const reposResponse = await get(url);
    if (!reposResponse.ok) throw Error('Unable to load repos');
    const repos = await reposResponse.json() as Array<Repo>;
    return Promise.all(repos.map(async (repo) => {
        let releases: Array<Release> = [];
        try {
            releases = await getReleases(repo.releases_url.replace('{/id}', ''));
        } catch (error) {
            console.log(error);
        }
        return {
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            site: repo.homepage || null,
            release: releases[0]?.html_url || null,
            page: repo.html_url,
            archived: repo.archived
        };
    }));
}

export {
    getRepos,
    getUser,
    getReleases
}