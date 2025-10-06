import { Doms } from '../constants';
import { createIcon } from '../utils';

function renderContact(template: HTMLTemplateElement, contact: Contact) {
    const clone = template.content.cloneNode(true) as Nullable<HTMLElement>;

    const logo = clone?.querySelector<HTMLDivElement>('.logo');
    const link = clone?.querySelector<HTMLAnchorElement>('.link');

    if (logo) {
        logo.append(createIcon(contact.logo) ?? contact.title);
    }

    if (link) {
        link.href = contact.url;
        link.innerText = contact.prettyUrl ?? contact.url;
    }

    return clone;
}

export default function render(contacts: Array<Contact>) {
    try {
        if (contacts.length > 0) {
            const nodes: Array<Node> = [];
            for (const contact of contacts) {
                const result = renderContact(Doms.TemplateContact, contact);
                if (result) nodes.push(result);
            }
            Doms.Contacts.querySelector('.contacts')?.replaceChildren(...nodes);
        } else {
            Doms.Contacts.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
