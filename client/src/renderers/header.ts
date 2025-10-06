import { Doms } from '../constants';
import { createElement, createIcon } from '../utils';

function renderLink({ title, url, logo }: Contact) {
    const link = createElement('a', { title, href: url, target: '_blank' });
    link.append(createIcon(logo) ?? title);
    return link;
}

function renderHeader(template: HTMLTemplateElement, user: MappedUser, contacts: Array<Contact>) {
    const clone = template.content.cloneNode(true) as Nullable<HTMLElement>;

    const _name = clone?.querySelector<HTMLDivElement>('.name');
    const _bio = clone?.querySelector<HTMLDivElement>('.bio');
    const _links = clone?.querySelector<HTMLDivElement>('.links');

    const { name, login, bio } = user;

    if (_name) _name.innerText = name ? name : login;

    if (_bio) {
        if (bio) {
            _bio.innerText = bio;
        } else {
            _bio.remove();
        }
    }

    if (_links) {
        if (contacts.length > 0) {
            _links.append(...contacts.map(renderLink));
        } else {
            _links.remove();
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
