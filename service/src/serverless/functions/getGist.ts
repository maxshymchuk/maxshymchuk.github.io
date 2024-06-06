import { getGistLastUpdated } from '../../common/api';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function getGist(): Promise<number> {
    return await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const data = await getGist();
    return res.json({ last_updated: data });
}