import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Constants } from '../../common/constants';
import { getGistLastUpdated, getUserData, patchGist } from '../../common/api';
import { serialize, stringify } from '../../common/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const timestamp = Date.now();
    const { user, repositories } = await getUserData();
    const snapshot = serialize(repositories);
    const data = {
        meta: { timestamp, snapshot },
        data: { user, repositories }
    }
    const lastUpdated = await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
    if (lastUpdated - Date.now() < Constants.defaultRequestIntervalMs) {
        await patchGist(stringify(data, true));
    }
    return res.json(data);
}