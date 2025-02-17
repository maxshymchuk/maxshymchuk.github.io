import { getData } from './api';
import { Const } from './constants';
import { headerModule, reposModule, footerModule } from './modules';
import { createLoader, parseGist } from './utils';

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

async function initialize() {
    if (!loader || !content) return;

    loader.classList.remove('invisible');
    content.classList.add('invisible');

    try {
        const response = await (import.meta.env.DEV ? import('../mock.json') : getData(loaders));

        const { meta, data } = response as Data;

        headerModule(data.user, data.custom);
        reposModule(data.repositories);
        footerModule(meta);

        loader.classList.add('invisible');
        content.classList.remove('invisible');
    } catch (error) {
        console.error(error);
        loader.innerText = 'Error :(';
    }
}

window.addEventListener('load', async () => await initialize());
