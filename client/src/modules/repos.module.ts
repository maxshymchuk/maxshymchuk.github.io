function renderLinks(repo: MappedRepo): string {
    const links = [
        { title: 'repo', url: repo.page },
        { title: 'site', url: repo.site },
        { title: 'release', url: repo.release },
    ].filter((link) => link.url && link.url !== `${window.location.origin}/`);
    return `[ ${links.map((link) => `<a href="${link.url}" target="_blank">${link.title}</a>`).join(' | ')} ]`;
}

function renderRepo(templateRepo: HTMLTemplateElement, repo: MappedRepo): Node | null {
    const clonedRepo = templateRepo.content.querySelector('.repo')?.cloneNode(true) as Nullable<HTMLElement>;

    const repoName = clonedRepo?.querySelector<HTMLElement>('.repo-name');
    const repoDescription = clonedRepo?.querySelector<HTMLElement>('.repo-description');
    const repoLinks = clonedRepo?.querySelector<HTMLElement>('.repo-links');
    const repoArchived = clonedRepo?.querySelector<HTMLElement>('.repo-marker.archived');

    if (repoName) repoName.innerText = repo.name;
    if (repoLinks) repoLinks.innerHTML = renderLinks(repo);
    if (!repo.archived) repoArchived?.remove();
    if (repo.description) {
        if (repoDescription) repoDescription.innerText = repo.description;
    } else {
        repoDescription?.remove();
    }

    return clonedRepo;
}

function reposModule(repositories: Array<MappedRepo>): void {
    if (repositories.length === 0) return;
    const listElement = document.getElementById('projects-list');
    const templateRepo = document.getElementById('template-repo') as HTMLTemplateElement | null;
    if (!listElement || !templateRepo) return;
    const repos: Array<Node> = [];
    for (const repo of repositories) {
        const result = renderRepo(templateRepo, repo);
        if (result) repos.push(result);
    }
    listElement.replaceChildren(...repos);
}

export { reposModule };
