import { get } from '../utils.js';

export default class RepoLoader {
    static async get(url: string): Promise<Array<MappedRepo>> {
        const reposResponse = await get(url);
        if (!reposResponse.ok) throw Error('Unable to load repos');
        const repos = await reposResponse.json() as Array<Repo>;
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            site: repo.homepage || null,
            page: repo.html_url,
            archived: repo.archived
        }));
    }
}