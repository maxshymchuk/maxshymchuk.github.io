import { Doms } from '../constants';

function renderLinks(project: MappedRepo) {
    const links = [
        { title: 'repo', url: project.page },
        { title: 'site', url: project.site },
        { title: 'release', url: project.release },
    ].filter((link) => link.url);
    return `[ ${links.map((link) => `<a href="${link.url}" target="_blank">${link.title}</a>`).join(' | ')} ]`;
}

function renderProject(template: HTMLTemplateElement, project: MappedRepo) {
    const clone = template.content.querySelector('.project')?.cloneNode(true) as Nullable<HTMLElement>;

    const name = clone?.querySelector<HTMLElement>('.name');
    const links = clone?.querySelector<HTMLElement>('.links');
    const archived = clone?.querySelector<HTMLElement>('.marker.archived');
    const description = clone?.querySelector<HTMLElement>('.description');

    if (name) name.innerText = project.name;
    if (links) links.innerHTML = renderLinks(project);
    if (archived) {
        if (!project.archived) archived.remove();
    }
    if (description) {
        if (project.description) {
            description.innerText = project.description;
        } else {
            description.remove();
        }
    }

    return clone;
}

export default function render(projects: Array<MappedRepo>) {
    try {
        if (projects.length > 0) {
            const nodes: Array<Node> = [];
            for (const project of projects) {
                const result = renderProject(Doms.TemplateProject, project);
                if (result) nodes.push(result);
            }
            Doms.Projects.querySelector('.projects')?.replaceChildren(...nodes);
        } else {
            Doms.Projects.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
