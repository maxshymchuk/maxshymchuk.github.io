import { Constants } from '../constants';

const sources = [
    // {
    //     url: 'vercel',
    //     extractor: parseVercel
    // },
    {
        url: 'https://api.github.com/gists/ec571ee4e7aa22601cf20c8084786924',
        headers: {
            Accept: 'application/vnd.github.raw+json',
            Authorization: `Bearer ${Constants.publicKey}`,
            'X-GitHub-Api-Version': '2022-11-28'
        },
        extractor: parseGist
    },
]

async function parseGist(response: Response): Promise<Data> {
    const gist = await response.json() as Gist;
    const file = gist.files[Constants.fileName];
    if (!file) throw Error('Can\'t find data file');
    return JSON.parse(file.content);
}

async function getData(): Promise<Data> {
    for (let { url, headers, extractor } of sources) {
        try {
            const response = await fetch(url, { method: 'GET', headers });
            if (response.ok) return extractor(response);
        } catch (error) {
            console.error(error);
        }
    }
    throw Error('Can\'t load data');
}

export { getData };