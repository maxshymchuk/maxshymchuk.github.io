import { getGistLastUpdated } from '../../common/api';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function gist(): Promise<number> {
    return await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    return res.json({ last_updated: await gist() });
}