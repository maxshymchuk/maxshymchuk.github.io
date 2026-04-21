import database from '../redis';
import { waitUntil } from '@vercel/functions';
import { INVALIDATE_AFTER_MS } from '../constants';
import api from '../api';
import github from '../api/adapters/github';
import { telemetry } from '../utils';

export default {
    async fetch(req: Request) {
        const client = api(github);

        try {
            const cache = await database.read<UserData>(database.keys.data);

            if (cache) return Response.json(cache);

            const data = await client.getData();

            if (!data) return new Response(null, { status: 404 });

            await database.write<UserData>(database.keys.data, data, {
                expiration: { type: 'PX', value: INVALIDATE_AFTER_MS },
            });

            return Response.json(data);
        } finally {
            waitUntil(telemetry(req));
        }
    },
};
