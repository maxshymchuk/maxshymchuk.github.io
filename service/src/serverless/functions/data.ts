import database from '../database';
import { config } from 'dotenv';
import { getUserData, patchGist } from '../../common/api';
import { serialize, stringify } from '../../common/utils';
import type { VercelRequest, VercelResponse } from '@vercel/node';

config({ override: true });

async function data(): Promise<Nullable<Data>> {
    const saved = await database.read<Data>(database.keys.data);

    if (saved) return saved;

    try {
        const { user, repositories } = await getUserData();

        const data: Data = {
            meta: { timestamp: Date.now(), snapshot: serialize(repositories) },
            data: { user, repositories }
        };

        try {
            await database.write<Data>(database.keys.data, data);
            console.log('Data update succeed');
        } catch (error) {
            console.log(`Data update failed: ${error}`)
        }

        try {
            const { history } = await patchGist(stringify(data, true));
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
