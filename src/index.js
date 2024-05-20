import { get } from './utils.js';
import { repositoriesMock } from './mocks.js';
import { API } from './api.js';

window.DEV_MODE = false;
window.USERNAME = 'maxshymchuk';

const repositoriesList = document.getElementById('repositories-list');
const templateRepo = document.getElementById('template-repo')

function mapper(raw) {
    return raw.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        site: repo.homepage,
        page: repo.html_url
    }))
}

function renderLinks(repo) {
    const names = ['repo', 'site'];
    const links = repo.site ? [repo.page, repo.site] : [repo.page];
    return `(${links.map((link, i) => `<a href="${link}" target="_blank">${names[i]}</a>`).join(' / ')})`;
}

function render(repo) {
    const clonedRepo = templateRepo.content.querySelector('.repo').cloneNode(true);
    const repoName = clonedRepo.querySelector('.repo-name');
    const repoLinks = clonedRepo.querySelector('.repo-links');
    const repoStars = clonedRepo.querySelector('.repo-stars');
    const repoStarsSpan = repoStars.querySelector('span');
    const repoDescription = clonedRepo.querySelector('.repo-description');
    repoName.innerText = repo.name;
    repoLinks.innerHTML = renderLinks(repo);
    if (repo.stars > 0) {
        repoStarsSpan.innerText = repo.stars;
    } else {
        repoStars.remove();
    }
    if (repo.description) {
        repoDescription.innerText = repo.description;
    } else {
        repoDescription.remove();
    }
    return clonedRepo;
}

async function initialize() {
    const response = await get(API.getReposByUsername(USERNAME), repositoriesMock);
    const repositories = await mapper(response.filter(repo => repo.name !== `${USERNAME}.github.io`))
    repositoriesList.replaceChildren(...repositories.map(repo => render(repo)));
}

document.body.onload = initialize;