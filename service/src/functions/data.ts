import database from '../database';
import { getData } from '../api';
import { serialize } from '../utils';
import { geolocation, waitUntil } from '@vercel/functions';
import { Const } from '../constants';
import { getStaticDataByCountry, isCISCountry } from '../../../share';

export default {
    async fetch(req: Request) {
        try {
            await database.open();

            const { country } = geolocation(req);

            const dbKey = isCISCountry(country) ? database.keys.dataCIS : database.keys.data;

            const saved = await database.read<Data>(dbKey);

            if (saved) return Response.json(saved);

            const userData = await getData();

            const staticData = getStaticDataByCountry(country);

            const current = Date.now();

            const data: Data = {
                meta: {
                    timestamp: current,
                    expired: current + Const.RequestIntervalMs,
                    snapshot: serialize(userData.repositories),
                },
                payload: { ...staticData, ...userData },
            };

            waitUntil(database.write<Data>(dbKey, data));

            return Response.json(data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await database.close();
        }
    },
};
