import { Constants } from '../../common/constants';
import { getGistLastUpdated, getUserData, patchGist } from '../../common/api';
import { serialize, stringify } from '../../common/utils';

async function getData() {
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

export { getData };