import { DOMS } from '../doms';

function renderLinks({ page, site, release }: MappedRepo) {
    const links = [
        { title: 'repo', url: page },
        { title: 'site', url: site },
        { title: 'release', url: release },
    ].filter((link) => link.url);
    return `[ ${links.map(({ url, title }) => `<a href="${url}" target="_blank">${title}</a>`).join(' | ')} ]`;
}

function renderProject(template: HTMLTemplateElement, project: MappedRepo) {
    const clone = template.content.querySelector('.project')?.cloneNode(true) as Nullable<HTMLElement>;

    const _name = clone?.querySelector<HTMLElement>('.name');
    const _links = clone?.querySelector<HTMLElement>('.links');
    const _archived = clone?.querySelector<HTMLElement>('.marker.archived');
    const _description = clone?.querySelector<HTMLElement>('.description');

    const { name, archived, description } = project;

    if (_name) _name.innerText = name;
    if (_links) _links.innerHTML = renderLinks(project);
    if (_archived && !archived) _archived.remove();
    if (_description) {
        if (description) {
            _description.innerText = description;
        } else {
            _description.remove();
        }
    }

    return clone;
}

export default function render(projects: Array<MappedRepo>) {
    try {
        if (projects.length > 0) {
            const nodes: Array<Node> = [];
            for (const project of projects) {
                const result = renderProject(DOMS.TemplateProject.node, project);
                if (result) nodes.push(result);
            }
            DOMS.Projects.node.querySelector('.projects')?.replaceChildren(...nodes);
        } else {
            DOMS.Projects.node.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
