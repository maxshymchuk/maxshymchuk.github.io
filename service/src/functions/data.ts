import database from '../database';
import { getData, patchGist } from '../api';
import { serialize, stringify } from '../utils';
import { geolocation, waitUntil } from '@vercel/functions';
import { Const } from '../constants';

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

export default {
    async fetch(req: Request) {
        try {
            await database.open();

            const saved = await database.read<Data>(database.keys.data);

            if (saved) return Response.json(saved);

            const geo = geolocation(req);

            const userData = await getData(geo);

            const current = Date.now();

            const data: Data = {
                meta: {
                    timestamp: current,
                    expired: current + Const.RequestIntervalMs,
                    snapshot: serialize(userData.repositories),
                },
                payload: userData,
            };

            waitUntil(Promise.all([updateDatabase(data), updateGist(data)]));

            return Response.json(data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await database.close();
        }
    },
};
