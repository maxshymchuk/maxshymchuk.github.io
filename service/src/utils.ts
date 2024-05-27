import { createHash } from 'crypto';

function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

function timestampToDate(timestamp: Nullable<number>): string {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return `${date.toLocaleString(undefined, { timeZoneName: 'shortOffset', hourCycle: 'h23' })}`;
}

async function get(url: string): Promise<Response> {
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github+json'
        }
    });
}

export { get, serialize, stringify, timestampToDate };