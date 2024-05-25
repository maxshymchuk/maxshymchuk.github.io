function serialize(obj: unknown): string {
    return JSON.stringify(obj);
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

export { get, serialize, timestampToDate };