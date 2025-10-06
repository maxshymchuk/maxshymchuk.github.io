import { DOMS } from '../doms';
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
            DOMS.About.node.querySelector('.about')?.replaceChildren(...nodes);
        } else {
            DOMS.About.node.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
