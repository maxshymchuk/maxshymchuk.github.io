const getHeaders = () => ({
    Accept: 'application/vnd.github+json',
    Authorization: process.env.TOKEN ? `Bearer ${process.env.TOKEN}` : '',
    'X-GitHub-Api-Version': '2022-11-28',
});

async function get(url: string): Promise<Response> {
    return fetch(url, { method: 'GET', headers: getHeaders() });
}

async function patch(url: string, body?: Nullable<string>): Promise<Response> {
    return fetch(url, { method: 'PATCH', body, headers: getHeaders() });
}

export { patch, getHeaders, get };
