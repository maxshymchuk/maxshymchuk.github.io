import { waitUntil } from '@vercel/functions';
import database from '../redis';
import { telemetry } from '../utils';

export default async function (req: Request) {
    try {
        await database.del(database.keys.data);
        return new Response('OK');
    } catch {
        return new Response('FAIL', { status: 500 });
    } finally {
        waitUntil(telemetry(req));
    }
}
