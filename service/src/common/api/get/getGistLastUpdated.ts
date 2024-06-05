import { get } from '../share';

function mapGist(gist: Gist): number {
    return Date.parse(gist.updated_at);
}


async function getGistLastUpdated(url: string): Promise<number> {
    const gistResponse = await get(url);
    const gist = await gistResponse.json() as Gist;
    return mapGist(gist);
}

export { getGistLastUpdated };