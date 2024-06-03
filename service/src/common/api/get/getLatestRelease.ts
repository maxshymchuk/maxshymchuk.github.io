import { get } from '../share';

async function getLatestRelease(url: string): Promise<Nullable<Release>> {
    const releasesResponse = await get(url);
    const releases = await releasesResponse.json() as Array<Release>;
    return releases.length > 0 ? releases[0] : null;
}

export { getLatestRelease };