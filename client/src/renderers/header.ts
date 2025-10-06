import { Doms } from '../constants';
import { createElement, createIcon } from '../utils';

function renderLink({ title, url, logo }: Contact) {
    const link = createElement('a', { title, href: url, target: '_blank' });
    link.append(createIcon(logo) ?? title);
    return link;
}

function renderHeader(template: HTMLTemplateElement, user: MappedUser, contacts: Array<Contact>) {
    const clone = template.content.cloneNode(true) as Nullable<HTMLElement>;

    const name = clone?.querySelector<HTMLDivElement>('.name');
    const bio = clone?.querySelector<HTMLDivElement>('.bio');
    const links = clone?.querySelector<HTMLDivElement>('.links');

    if (name) {
        name.innerText = user.name ? user.name : user.login;
    }

    if (bio) {
        if (user.bio) {
            bio.innerText = user.bio;
        } else {
            bio.remove();
        }
    }

    if (links) {
        if (contacts.length > 0) {
            links.append(...contacts.map(renderLink));
        } else {
            links.remove();
        }
    }

    return clone;
}

export default function render(user: MappedUser, contacts: Array<Contact>) {
    try {
        const node = renderHeader(Doms.TemplateHeader, user, contacts);
        if (node) {
            Doms.Header.replaceChildren(node);
        } else {
            Doms.Header.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
