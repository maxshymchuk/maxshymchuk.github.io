import { Doms } from '../constants';
import { createElement } from '../utils';

function renderAbout(line: string) {
    const p = createElement('p');
    p.innerHTML = line;
    return p;
}

export default function render(about: Array<string>) {
    try {
        if (about.length > 0) {
            const nodes: Array<Node> = [];
            for (const line of about) {
                const result = renderAbout(line);
                if (result) nodes.push(result);
            }
            Doms.About.querySelector('.about')?.replaceChildren(...nodes);
        } else {
            Doms.About.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
