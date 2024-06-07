import { Constants } from '../../common/constants';
import { getGistLastUpdated, getUserData, patchGist } from '../../common/api';
import { serialize, stringify } from '../../common/utils';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function data(): Promise<Data> {
    const timestamp = Date.now();
    const { user, repositories } = await getUserData();
    const snapshot = serialize(repositories);
    const data: Data = {
        meta: { timestamp, snapshot },
        data: { user, repositories }
    }
    const lastUpdated = await getGistLastUpdated(`https://api.github.com/gists/${process.env.GIST_ID}`);
    if (Date.now() - lastUpdated > Constants.defaultRequestIntervalMs) {
        await patchGist(stringify(data, true));
    }
    return data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    return res.json(await data());
}
