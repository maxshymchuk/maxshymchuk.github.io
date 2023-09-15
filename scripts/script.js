import { get } from './utils.js';
import Preloader from './classes/Preloader.js';
import { contributorsMock, languagesMock, repositoriesMock } from './mocks.js';
import { API } from './api.js';
import Collection from './classes/Collection.js';

window.DEV_MODE = true;
window.USERNAME = 'maxshymchuk';
window.INIT = initialize;

async function initialize() {
    Preloader.show();

    const initialRepositories = await get(API.getReposByUsername(USERNAME), repositoriesMock);

    const repos = initialRepositories.filter(repo => repo.name !== `${USERNAME}.github.io`);

    const projects = await Promise.all(
        repos.map(async (repo) => {
            const languages = await get(repo.languages_url, languagesMock);
            const contributors = await get(repo.contributors_url, contributorsMock);
            return {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                updatedAt: new Date(repo.updated_at),
                languages: Object.keys(languages),
                contributors: contributors ?? [],
                site: repo.homepage,
                page: repo.html_url
            };
        })
    );

    const collection = new Collection('table', projects);
    collection.renderAll();

    // const arrowLeft = document.getElementById('arrow__left');
    // const arrowRight = document.getElementById('arrow__right');
    // arrowLeft.addEventListener('click', slider.prev.bind(slider));
    // arrowRight.addEventListener('click', slider.next.bind(slider));

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    Preloader.hide();
}

document.body.onload = initialize;