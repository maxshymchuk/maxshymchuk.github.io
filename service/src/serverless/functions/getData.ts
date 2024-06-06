import { Constants } from '../../common/constants';
import { getGistLastUpdated, getUserData, patchGist } from '../../common/api';
import { serialize, stringify } from '../../common/utils';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function getData(): Promise<Data> {
    const timestamp = Date.now();
    const { user, repositories } = await getUserData();
    const snapshot = serialize(repositories);
    const data: Data = {
        meta: { timestamp, snapshot },
        data: { user, repositories }
    }
    const lastUpdated = await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
    if (lastUpdated - Date.now() < Constants.defaultRequestIntervalMs) {
        await patchGist(stringify(data, true));
    }
    return data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const data = await getData();
    return res.json(data);
}