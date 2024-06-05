import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getGistLastUpdated, getUserData, patchGist } from '../common/api';
import { serialize, stringify } from '../common/utils';
import { Constants } from '../common/constants';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const lastUpdated = await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
    if (lastUpdated - Date.now() < Constants.defaultRequestIntervalMs) return;
    const timestamp = Date.now();
    const { user, repositories } = await getUserData();
    const snapshot = serialize(repositories);
    const data = {
        meta: { timestamp, snapshot },
        data: { user, repositories }
    }
    await patchGist(stringify(data, true));
    return res.json(data);
}