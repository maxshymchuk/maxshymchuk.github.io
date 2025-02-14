type Source = {
    url: string;
    headers?: HeadersInit;
    parser?: (value: Response) => Promise<Data>;
};

function createLoader(source: Source | string): () => Promise<Data> {
    return async () => {
        const url = typeof source === 'string' ? source : source.url;
        const headers = typeof source === 'string' ? undefined : source.headers;
        const parser = typeof source === 'string' ? undefined : source.parser;
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) throw Error("Can't load data");
        return parser ? parser(response) : response.json();
    };
}

export type Loader = ReturnType<typeof createLoader>;

export { createLoader };
