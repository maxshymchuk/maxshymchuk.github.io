import { Errors } from '../../constants';
import { patch } from '../share';

async function patchGist(content: Nullable<string>): Promise<Gist> {
    if (!process.env.GIST_ID) throw Error(Errors.envGistId);
    if (!process.env.GIST_FILE) throw Error(Errors.envGistFile);
    const body = JSON.stringify({ files: { [process.env.GIST_FILE]: { content } } });
    const gistResponse = await patch(`https://api.github.com/gists/${process.env.GIST_ID}`, body);
    return await gistResponse.json() as Gist;
}

export { patchGist };