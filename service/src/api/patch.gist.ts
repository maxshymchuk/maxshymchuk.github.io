import { patch } from './share';
import { Const } from '../constants';

async function patchGist(content: Nullable<string>): Promise<Gist> {
    if (!process.env.GIST_ID) throw Error(Const.Error.EnvGistId);
    if (!process.env.GIST_FILE) throw Error(Const.Error.EnvGistFile);
    const body = JSON.stringify({ files: { [process.env.GIST_FILE]: { content } } });
    const gistResponse = await patch(`https://api.github.com/gists/${process.env.GIST_ID}`, body);
    return (await gistResponse.json()) as Gist;
}

export { patchGist };
