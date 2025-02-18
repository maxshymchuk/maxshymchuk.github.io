import { getData } from './api';
import { Const } from './constants';
import { headerModule, reposModule, footerModule } from './modules';
import { createLoader, parseGist } from './utils';
import { getCache, setCache } from './utils/cache';

const loader = document.getElementById('loader');
const content = document.getElementById('content');

const loaders = [
    createLoader(Const.Sources.Vercel),
    createLoader({
        url: Const.Sources.Gist,
        headers: {
            Accept: 'application/vnd.github.raw+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        parser: parseGist,
    }),
];

async function load(): Promise<Data> {
    if (import.meta.env.DEV) return import('../mock.json') as Promise<Data>;
    const cache = getCache();
    if (cache && Date.now() < cache.meta.expired) return cache;
    const data = await getData(loaders);
    setCache(data);
    return data;
}

async function initialize() {
    if (!loader || !content) return;

    loader.classList.remove('invisible');
    content.classList.add('invisible');

    try {
        const { meta, payload } = await load();

        await headerModule(payload.user);
        reposModule(payload.repositories);
        footerModule(meta);

        loader.classList.add('invisible');
        content.classList.remove('invisible');
    } catch (error) {
        console.error(error);
        loader.innerText = 'Error :(';
    }
}

window.addEventListener('load', async () => await initialize());
