import database from '../database';
import { getUserData, patchGist } from '../../common/api';
import { stringify } from '../../common/utils';
import type { VercelRequest, VercelResponse } from '@vercel/node';

async function data(): Promise<Nullable<UserData>> {
    const saved = await database.read<UserData>(database.keys.data);

    if (saved) return saved;

    try {
        const data = await getUserData();

        try {
            await database.write<UserData>(database.keys.data, data);
            console.log('Data update succeed');
        } catch (error) {
            console.log(`Data update failed: ${error}`)
        }

        try {
            if (!process.env.GIST_SERVERLESS_ID) throw Error('.env GIST_SERVERLESS_ID not found');
            if (!process.env.GIST_SERVERLESS_FILE) throw Error('.env GIST_SERVERLESS_FILE not found');
            const { history } = await patchGist(stringify(data, true), process.env.GIST_SERVERLESS_ID, process.env.GIST_SERVERLESS_FILE);
            console.log('Gist update succeed');
            console.log(`New version -> ${history[0].version}`);
        } catch (error) {
            console.log(`Gist update failed: ${error}`)
        }

        return data;
    } catch (error) {
        console.log(error);
        return saved;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    return res.json(await data());
}
