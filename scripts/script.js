import { get, place, shuffle } from './utils.js';
import Preloader from './classes/Preloader.js';
import { contributorsMock, languagesMock, repositoriesMock } from './mocks.js';
import { API } from './api.js';

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

    const shuffled = shuffle(projects);

    const placement = place(shuffled);
    console.log(placement)

    const table = document.getElementById('table');
    const circleTemplate = document.getElementById('template-circle');
    const fragment = document.createDocumentFragment();
    const dims = table.getBoundingClientRect();
    placement.forEach(project => {
        const circleNode = circleTemplate.content.cloneNode(true).querySelector('.circle');
        circleNode.style.left = `calc(${project.x * 11}vh + ${dims.width / 2}px)`;
        circleNode.style.top = `calc(${project.y * 11}vh + ${dims.height / 2}px)`;
        circleNode.innerText = project.id;
        fragment.append(circleNode);
    });
    table.innerHTML = '';
    table.append(fragment);

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