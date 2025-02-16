import { getData } from './api';
import { Const } from './constants';
import { headerModule, reposModule, footerModule } from './modules';
import { createLoader, parseGist } from './utils';
import mock from '../mock.json';

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
        const { meta, data } = import.meta.env.DEV ? mock : await getData(loaders);

        headerModule(data.user);
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
