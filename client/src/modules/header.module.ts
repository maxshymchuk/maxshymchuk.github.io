import { Doms } from '../constants';
import { custom } from '../custom';
import { createElement } from '../utils';

async function renderLink({ key, title, url }: Link): Promise<Node> {
    const link = createElement('a', {
        title,
        href: url,
        target: '_blank',
        class: 'header-link',
    });
    try {
        const content = await import(`../assets/${key}.svg?raw`);
        link.style.fontSize = '0';
        link.innerHTML = content.default;
    } catch {
        link.innerText = title;
    }
    return link;
}

async function Header(user: MappedUser): Promise<void> {
    Doms.HeaderName.innerText = user.name ? user.name : user.login;

    if (user.bio) {
        Doms.HeaderBio.innerText = user.bio;
    } else {
        Doms.HeaderBio.remove();
    }

    if (custom.links.length > 0) {
        return Promise.all(custom.links.map(renderLink)).then((links) => Doms.HeaderLinks.append(...links));
    } else {
        Doms.HeaderLinks.remove();
    }
}

export { Header };
