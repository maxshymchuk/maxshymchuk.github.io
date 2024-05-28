import dataUrl from '../public/data.json?url';

function updateHeaderByUser(user: MappedUser): void {
    const headerName = document.getElementById('header-name') as Nullable<HTMLElement>;
    const headerBio = document.getElementById('header-bio') as Nullable<HTMLElement>;
    const headerEmail = document.getElementById('header-links-email') as Nullable<HTMLAnchorElement>;
    if (headerName) {
        headerName.innerText = user.name ? user.name : user.login;
    }
    if (headerBio) {
        if (user.bio) {
            headerBio.innerText = user.bio;
        } else {
            headerBio.remove();
        }
    }
    if (headerEmail) {
        if (user.email) {
            headerEmail.href = `mailto:${user.email}`;
        } else {
            headerEmail.remove();
        }
    }
}

function updateListByRepos(repositories: Array<MappedRepo>): void {
    if (repositories.length === 0) return;
    const listElement = document.getElementById('repositories-list') as Nullable<HTMLElement>;
    const rendered: Array<Node> = [];
    for (let repo of repositories) {
        const result = render(repo);
        if (result) rendered.push(result);
    }
    listElement?.replaceChildren(...rendered);
}

function renderLinks(repo: MappedRepo): string {
    const links = [
        { title: 'repo', url: repo.page },
        { title: 'site', url: repo.site },
        { title: 'release', url: repo.release },
    ].filter(link => link.url);
    return `(${links.map(link => `<a href="${link.url}" target="_blank">${link.title}</a>`).join(' / ')})`;
}

function render(repo: MappedRepo): Node | null {
    const clonedRepo = templateRepo?.content.querySelector('.repo')?.cloneNode(true) as Nullable<HTMLElement>;

    const repoName = clonedRepo?.querySelector('.repo-name') as Nullable<HTMLElement>;
    const repoDescription = clonedRepo?.querySelector('.repo-description') as Nullable<HTMLElement>;
    const repoLinks = clonedRepo?.querySelector('.repo-links') as Nullable<HTMLElement>;
    const repoStars = clonedRepo?.querySelector('.repo-marker.stars') as Nullable<HTMLElement>;
    const repoStarsSpan = repoStars?.querySelector('span') as Nullable<HTMLElement>;
    const repoArchived = clonedRepo?.querySelector('.repo-marker.archived') as Nullable<HTMLElement>;

    if (repoName) repoName.innerText = repo.name;
    if (repoLinks) repoLinks.innerHTML = renderLinks(repo);
    if (!repo.archived) repoArchived?.remove();
    if (repo.stars > 0) {
        if (repoStarsSpan) repoStarsSpan.innerText = `${repo.stars}`;
    } else {
        repoStars?.remove();
    }
    if (repo.description) {
        if (repoDescription) repoDescription.innerText = repo.description;
    } else {
        repoDescription?.remove();
    }

    return clonedRepo;
}

const loader = document.getElementById('loader') as HTMLElement | null;
const content = document.getElementById('content') as HTMLElement | null;
const templateRepo = document.getElementById('template-repo') as HTMLTemplateElement | null;

async function initialize() {
    if (!loader || !content || !templateRepo) return;

    loader.classList.remove('invisible');
    content.classList.add('invisible');

    const response = await fetch(dataUrl);

    if (response.ok) {
        const { data } = await response.json() as Data;

        updateHeaderByUser(data.user);
        updateListByRepos(data.repositories);

        setTimeout(() => {
            loader.classList.add('invisible');
            content.classList.remove('invisible');
        }, 500);
    } else {
        loader.innerText = 'Error :('
    }
}

window.addEventListener('load', async () => await initialize());