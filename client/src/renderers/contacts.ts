import { Doms } from '../constants';
import { createElement } from '../utils';

async function createContactItem({ title, url, prettyUrl, logo }: Contact): Promise<Node> {
    const wrapper = createElement('div', { class: 'contact' });
    const link = createElement('a', { class: 'contact-link', title, href: url, target: '_blank' });
    if (logo) {
        const icon = createElement('div', { class: 'contact-icon' });
        icon.style.fontSize = '0';
        icon.classList.add('icon');
        icon.innerHTML = logo;
        wrapper.append(icon);
    }
    link.textContent = prettyUrl ?? url;
    wrapper.append(link);
    return wrapper;
}

export default async function render(contacts: Array<Contact>) {
    try {
        if (contacts.length > 0) {
            const nodes = await Promise.all(contacts.map(createContactItem));
            Doms.ContactsLinks.append(...nodes);
        } else {
            Doms.ContactsLinks.remove();
        }
    } catch (error) {
        console.error(error);
    }
}
