const getHeaders = () => ({
    Expires: '0',
    Pragma: 'no-cache',
    Accept: 'application/vnd.github+json',
    Authorization: process.env.TOKEN ? `Bearer ${process.env.TOKEN}` : '',
    'X-GitHub-Api-Version': '2022-11-28',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
});

async function get(url: string): Promise<Response> {
    return fetch(url, { method: 'GET', headers: getHeaders() });
}

export { getHeaders, get };
