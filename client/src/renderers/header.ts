import { Doms } from '../constants';
import { createElement } from '../utils';

async function renderLinkItem({ title, url, logo }: Contact): Promise<Node> {
    const link = createElement('a', {
        title,
        href: url,
        target: '_blank',
        class: 'header-link',
    });
    if (logo) {
        link.style.fontSize = '0';
        link.classList.add('icon');
        link.innerHTML = logo;
    } else {
        link.innerText = title;
    }
    return link;
}

export default async function render(user: MappedUser, contacts: Array<Contact>) {
    try {
        Doms.HeaderName.innerText = user.name ? user.name : user.login;

        if (user.bio) {
            Doms.HeaderBio.innerText = user.bio;
        } else {
            Doms.HeaderBio.remove();
        }

        if (contacts.length > 0) {
            const nodes = await Promise.all(contacts.map(renderLinkItem));
            Doms.HeaderLinks.append(...nodes);
        } else {
            Doms.HeaderLinks.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
