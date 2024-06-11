import { patch } from '../share';

async function patchGist(content: Nullable<string>, id: string, file: string): Promise<Gist> {
    const body = JSON.stringify({ files: { [file]: { content } } });
    const gistResponse = await patch(`https://api.github.com/gists/${id}`, body);
    return await gistResponse.json() as Gist;
}

export { patchGist };