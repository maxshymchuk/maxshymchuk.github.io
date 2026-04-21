type FetcherMethods = 'get' | 'post' | 'put' | 'delete';
type FetcherParams = Record<string, unknown>;
type FetcherOptions = Omit<RequestInit, 'method'>;

async function fetcher<Response = unknown>(
    method: FetcherMethods,
    url: string,
    options?: FetcherOptions,
): Promise<Response> {
    const response = await fetch(url, { ...options, method });
    return (await response.json()) as Response;
}

export default fetcher;

export type { FetcherMethods, FetcherParams, FetcherOptions };
