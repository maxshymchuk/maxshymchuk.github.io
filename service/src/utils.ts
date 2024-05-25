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

function logKeyValue(key: string, value: string, newLine = false, padding = 25) {
    console.log(key.padEnd(padding), value);
    if (newLine) console.log();
}

export { get, serialize, timestampToDate, logKeyValue };