function renderLinks(repo: MappedRepo): string {
    const links = [
        { title: 'repo', url: repo.page },
        { title: 'site', url: repo.site },
        { title: 'release', url: repo.release },
    ].filter(link => link.url && link.url !== `${window.location.origin}/`);
    return `[ ${links.map(link => `<a href="${link.url}" target="_blank">${link.title}</a>`).join(' | ')} ]`;
}

function renderRepo(repo: MappedRepo): Node | null {
    const templateRepo = document.getElementById('template-repo') as HTMLTemplateElement | null;

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

function reposModule(repositories: Array<MappedRepo>): void {
    if (repositories.length === 0) return;
    const listElement = document.getElementById('repositories-list') as Nullable<HTMLElement>;
    const rendered: Array<Node> = [];
    for (let repo of repositories) {
        const result = renderRepo(repo);
        if (result) rendered.push(result);
    }
    listElement?.replaceChildren(...rendered);
}

export { reposModule };