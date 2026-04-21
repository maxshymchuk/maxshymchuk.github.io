import { geolocation, ipAddress } from '@vercel/functions';
import { createHash } from 'crypto';
import database from './redis';

export function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

export function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

export function telemetry(req: Request) {
    const { city, country } = geolocation(req);
    return database.add<Telemetry>(database.keys.telemetry, {
        timestamp: Date.now(),
        ip: ipAddress(req),
        place: [city, country].filter(Boolean).join(', '),
    });
}
