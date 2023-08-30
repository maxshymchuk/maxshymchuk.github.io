import { get, shuffle } from './utils.js';
import Slider from './classes/Slider.js';
import Preloader from './classes/Preloader.js';
import { contributorsMock, languagesMock, repositoriesMock } from './mocks.js';
import { API } from './consts.js';

window.DEV_MODE = false;
window.USERNAME = 'maxshymchuk';
window.INIT = initialize;

async function initialize() {
    Preloader.show();

    const initialRepositories = await get(API.getReposByUsername(USERNAME), repositoriesMock);

    const repos = initialRepositories.filter(repo => repo.name !== `${USERNAME}.github.io`);

    const slides = await Promise.all(
        repos.map(async (repo) => {
            const languages = await get(repo.languages_url, languagesMock);
            const contributors = await get(repo.contributors_url, contributorsMock);
            return {
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

    const shuffled = shuffle(slides);

    const slider = new Slider(
        shuffled,
        document.getElementById('template__project'),
        document.getElementById('slider-entry')
    );

    const arrowLeft = document.getElementById('arrow__left');
    const arrowRight = document.getElementById('arrow__right');
    arrowLeft.addEventListener('click', slider.prev.bind(slider));
    arrowRight.addEventListener('click', slider.next.bind(slider));

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    Preloader.hide();
}

document.body.onload = initialize;