import { DOMS } from '../doms';
import { createIcon } from '../utils';

function renderContact(template: HTMLTemplateElement, contact: Contact) {
    const clone = template.content.cloneNode(true) as Nullable<HTMLElement>;

    const _logo = clone?.querySelector<HTMLDivElement>('.logo');
    const _link = clone?.querySelector<HTMLAnchorElement>('.link');

    const { title, url, prettyUrl, logo } = contact;

    if (_logo) {
        _logo.append(createIcon(logo) ?? title);
    }

    if (_link) {
        _link.href = url;
        _link.innerText = prettyUrl ?? url;
    }

    return clone;
}

export default function render(contacts: Array<Contact>) {
    try {
        if (contacts.length > 0) {
            const nodes: Array<Node> = [];
            for (const contact of contacts) {
                const result = renderContact(DOMS.TemplateContact.node, contact);
                if (result) nodes.push(result);
            }
            DOMS.Contacts.node.querySelector('.contacts')?.replaceChildren(...nodes);
        } else {
            DOMS.Contacts.node.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
