import { getData } from './api';
import { Const } from './constants';
import { headerModule, reposModule } from './modules';
import { createLoader, parseGist } from './utils';
import mock from '../mock.json';

const loader = document.getElementById('loader') as HTMLElement | null;
const content = document.getElementById('content') as HTMLElement | null;

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
        const { data } = import.meta.env.DEV ? mock : await getData(loaders);

        headerModule(data.user);
        reposModule(data.repositories);

        loader.classList.add('invisible');
        content.classList.remove('invisible');
    } catch (error) {
        console.error(error);
        loader.innerText = 'Error :(';
    }
}

window.addEventListener('load', async () => await initialize());
