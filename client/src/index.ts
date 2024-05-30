import { getData } from './modules/api';
import { createHeaderByUser } from './modules/createHeader';
import { createReposFrom } from './modules/createRepos';

const loader = document.getElementById('loader') as HTMLElement | null;
const content = document.getElementById('content') as HTMLElement | null;

async function initialize() {
    if (!loader || !content) return;

    loader.classList.remove('invisible');
    content.classList.add('invisible');

    try {
        const { data } = await getData();

        createHeaderByUser(data.user);
        createReposFrom(data.repositories);

        setTimeout(() => {
            loader.classList.add('invisible');
            content.classList.remove('invisible');
        }, 500);
    } catch (error) {
        console.error(error);
        loader.innerText = 'Error :('
    }
}

window.addEventListener('load', async () => await initialize());