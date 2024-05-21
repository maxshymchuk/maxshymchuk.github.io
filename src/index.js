import { get } from './utils.js';
import { repositoriesMock, userMock } from './mocks.js';

window.DEV_MODE = false;
window.INIT = initialize;

const DEFAULT_USERNAME = 'maxshymchuk';

const loader = document.getElementById('loader');
const content = document.getElementById('content');

const repositoriesList = document.getElementById('repositories-list');
const templateRepo = document.getElementById('template-repo')

const headerName = document.getElementById('header-name');
const headerBio = document.getElementById('header-bio');

const headerEmail = document.getElementById('header-links-email');

function updateHeaderByUser(user) {

    if (user.name) {
        headerName.innerText = user.name;
    } else {
        headerName.innerText = user.login;
    }
    if (user.bio) {
        headerBio.innerText = user.bio;
    } else {
        headerBio.remove();
    }
    if (user.email) {
        headerEmail.href = `mailto:${user.email}`;
    } else {
        headerEmail.remove();
    }
}

function updateListByRepos(repositories) {
    if (repositories.length === 0) return;
    const rendered = mapper(repositories).map(repo => render(repo));
    repositoriesList.replaceChildren(...rendered);
}

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

async function initialize(username = DEFAULT_USERNAME) {
    loader.classList.remove('invisible');
    content.classList.add('invisible');

    const user = await get(`https://api.github.com/users/${username}`, username, userMock);
    const repositories = await get(user.repos_url, username, repositoriesMock);

    updateHeaderByUser(user);
    updateListByRepos(repositories.filter(repo => repo.name !== `${username}.github.io`));

    loader.classList.add('invisible');
    content.classList.remove('invisible');
}

window.addEventListener('load', async () => await initialize());