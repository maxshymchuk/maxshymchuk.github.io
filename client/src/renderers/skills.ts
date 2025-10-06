import { Doms } from '../constants';
import { createElement } from '../utils';

function renderListItem(value: string) {
    const li = createElement('li');
    li.innerHTML = value;
    return li;
}

function renderSkillsGroup(template: HTMLTemplateElement, group: SkillsGroup) {
    const clone = template.content.querySelector('.skills-group')?.cloneNode(true) as Nullable<HTMLElement>;

    const _title = clone?.querySelector<HTMLHeadingElement>('.title');
    const _list = clone?.querySelector<HTMLUListElement>('.list');

    const { title, list } = group;

    if (_title) _title.innerText = title;
    if (_list) _list.append(...list.map(renderListItem));

    return clone;
}

export default function render(groups: Array<SkillsGroup>) {
    try {
        if (groups.length > 0) {
            const nodes: Array<Node> = [];
            for (const group of groups) {
                const result = renderSkillsGroup(Doms.TemplateSkillsGroup, group);
                if (result) nodes.push(result);
            }
            Doms.Skills.querySelector('.skills')?.replaceChildren(...nodes);
        } else {
            Doms.Skills.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
