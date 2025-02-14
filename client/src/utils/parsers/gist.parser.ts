import { Const } from '../../constants';

async function parseGist(response: Response): Promise<Data> {
    const gist = (await response.json()) as Gist;
    const file = gist.files[Const.FileName];
    if (!file) throw Error("Can't find data file");
    return JSON.parse(file.content);
}

export { parseGist };
