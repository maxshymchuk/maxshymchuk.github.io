import { createAdapter } from '../utils';
import { Octokit } from '@octokit/core';

const GITHUB_TOKEN = process.env.GH_TOKEN;

export default createAdapter((defaultApi) => {
    if (!GITHUB_TOKEN) return defaultApi;

    const client = new Octokit({ auth: GITHUB_TOKEN });

    return {
        getData: async () => {
            const [{ data: user }, { data: repos }] = await Promise.all([
                client.request('GET /user'),
                client.request('GET /user/repos', { visibility: 'public' }),
            ]);

            const _user: MappedUser = {
                login: user.login,
                name: user.name,
                bio: user.bio,
            };

            const _repos: Array<MappedRepo> = [];
            for (const repo of repos) {
                if (repo.name === _user.login || repo.name === `${_user.login}.github.io`) continue;
                const { data: releases } = await client.request('GET /repos/{owner}/{repo}/releases', {
                    owner: _user.login,
                    repo: repo.name,
                });
                const latestRelease = releases.length > 0 ? releases[0] : null;
                _repos.push({
                    name: repo.name,
                    description: repo.description,
                    stars: repo.stargazers_count,
                    site: repo.homepage,
                    release: latestRelease?.html_url || null,
                    page: repo.html_url,
                    archived: repo.archived,
                });
            }

            const defData = await defaultApi.getData();

            return { ...defData, user: _user, repositories: _repos };
        },
    };
});
