import database from '../database';
import { config } from 'dotenv';
import { getData, patchGist } from '../api';
import { serialize, stringify } from '../utils';
import { jsonHandler } from '../utils';
import { waitUntil } from '@vercel/functions';

config({ override: true });

async function updateDatabase(data: Data) {
    try {
        await database.write<Data>(database.keys.data, data);
        console.log('Data update succeed');
    } catch (error) {
        console.log(`Data update failed: ${error}`);
    }
}

async function updateGist(data: Data) {
    try {
        const { history } = await patchGist(stringify(data, true));
        console.log('Gist update succeed');
        console.log(`New version -> ${history[0].version}`);
    } catch (error) {
        console.log(`Gist update failed: ${error}`);
    }
}

async function data(): Promise<Nullable<Data>> {
    const saved = await database.read<Data>(database.keys.data);

    if (saved) return saved;

    try {
        const { user, repositories, custom } = await getData();

        const data: Data = {
            meta: { timestamp: Date.now(), snapshot: serialize(repositories) },
            data: { user, repositories, custom },
        };

        waitUntil(Promise.all([updateDatabase(data), updateGist(data)]));

        return data;
    } catch (error) {
        console.log(error);
        return saved;
    }
}

export default jsonHandler(data);
