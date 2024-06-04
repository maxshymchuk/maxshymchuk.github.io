import { createHeaderByUser } from './modules/createHeader';
import { createReposFrom } from './modules/createRepos';
import { createLoader, parseGist, getData } from './api';
import { Sources } from './constants';

const loader = document.getElementById('loader') as HTMLElement | null;
const content = document.getElementById('content') as HTMLElement | null;

const loaders = [
    createLoader(Sources.vercelUrl),
    createLoader({
        url: Sources.gistUrl,
        headers: {
            Accept: 'application/vnd.github.raw+json',
            'X-GitHub-Api-Version': '2022-11-28'
        },
        parser: parseGist
    })
]

async function initialize() {
    if (!loader || !content) return;

    loader.classList.remove('invisible');
    content.classList.add('invisible');

    try {
        const { data } = await getData(loaders);

        createHeaderByUser(data.user);
        createReposFrom(data.repositories);

        loader.classList.add('invisible');
        content.classList.remove('invisible');
    } catch (error) {
        console.error(error);
        loader.innerText = 'Error :('
    }
}

window.addEventListener('load', async () => await initialize());