type FetcherMethods = 'get' | 'post' | 'put' | 'delete';
type FetcherParams = Record<string, unknown>;
type FetcherOptions = Omit<RequestInit, 'method'>;

async function fetcher<Response = unknown>(
    method: FetcherMethods,
    url: string,
    options?: FetcherOptions,
): Promise<Response> {
    const response = await fetch(url, {
        ...options,
        headers: {
            Expires: '0',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...options?.headers,
        },
        method,
    });
    return (await response.json()) as Response;
}

export default fetcher;

export type { FetcherMethods, FetcherParams, FetcherOptions };
