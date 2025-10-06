import { DOMS } from '../doms';
import { createElement } from '../utils';

function renderTechItem(value: string) {
    const li = createElement('li');
    li.innerHTML = value;
    return li;
}

function renderAchievementItem(value: string) {
    const li = createElement('li');
    const p = createElement('p');
    p.innerHTML = value;
    li.append(p);
    return li;
}

function renderExperience(template: HTMLTemplateElement, experience: Experience) {
    const clone = template.content.querySelector('.experience')?.cloneNode(true) as Nullable<HTMLElement>;

    const _company = clone?.querySelector<HTMLHeadingElement>('.company');
    const _date = clone?.querySelector<HTMLDivElement>('.date');
    const _achievements = clone?.querySelector<HTMLUListElement>('.achievements');
    const _techstack = clone?.querySelector<HTMLUListElement>('.techstack');

    const { company, interval, achievements, techstack } = experience;

    if (_company) _company.innerText = company.toLowerCase();
    if (_date) _date.innerText = interval;
    if (_achievements) _achievements.append(...achievements.map(renderAchievementItem));
    if (_techstack) _techstack.append(...techstack.map(renderTechItem));

    return clone;
}

export default function render(experiences: Array<Experience>) {
    try {
        if (experiences.length > 0) {
            const nodes: Array<Node> = [];
            for (const experience of experiences) {
                const result = renderExperience(DOMS.TemplateExperience.node, experience);
                if (result) nodes.push(result);
            }
            DOMS.Experience.node.querySelector('.experiences')?.replaceChildren(...nodes);
        } else {
            DOMS.Experience.node.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
