import database from '../redis';
// import { waitUntil } from '@vercel/functions';
import { INVALIDATE_AFTER_MS, REDIS_URL } from '../constants';
import api from '../api';
import github from '../api/adapters/github';
// import { telemetry } from '../utils';

export default async function () {
    const client = api(github);

    console.log(REDIS_URL);

    try {
        const cache = await database.read<UserData>(database.keys.data);

        console.log('CACHE', cache);

        if (cache) return Response.json(cache);

        const data = await client.getData();

        console.log('DATA', data);

        if (!data) return new Response(null, { status: 404 });

        await database.write<UserData>(database.keys.data, data, {
            expiration: { type: 'PX', value: INVALIDATE_AFTER_MS },
        });

        return Response.json(data);
    } catch (error) {
        console.error(error);
    } finally {
        // waitUntil(telemetry(req));
    }
}
