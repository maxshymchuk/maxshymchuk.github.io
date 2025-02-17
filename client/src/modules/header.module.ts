const mapping: Record<LinkKeys, string> = {
    github: 'assets/github.svg',
    linkedin: 'assets/linkedin.svg',
    telegram: 'assets/telegram.svg',
    notion: 'assets/notion.svg',
    email: 'assets/email.svg',
};

function renderLinks(templateLink: HTMLTemplateElement, link: Link): Node | null {
    const clonedLink = templateLink.content.querySelector('.header-link')?.cloneNode(true) as Nullable<HTMLLinkElement>;
    if (!clonedLink) return null;
    clonedLink.href = link.url;
    const linkImage = clonedLink?.querySelector<HTMLImageElement>('img');
    if (linkImage) {
        linkImage.src = mapping[link.key];
        linkImage.alt = link.title;
        linkImage.title = link.title;
    } else {
        clonedLink.innerText = link.title;
    }
    return clonedLink;
}

function headerModule(user: MappedUser, custom: Custom): void {
    const headerName = document.getElementById('header-name');
    if (headerName) {
        headerName.innerText = user.name ? user.name : user.login;
    }

    const headerBio = document.getElementById('header-bio');
    if (headerBio) {
        if (user.bio) {
            headerBio.innerText = user.bio;
        } else {
            headerBio.remove();
        }
    }

    const headerLinks = document.getElementById('header-links');
    const templateLink = document.getElementById('template-header-link') as HTMLTemplateElement | null;
    if (headerLinks && templateLink) {
        const links: Array<Node> = [];
        for (const link of custom.links) {
            const result = renderLinks(templateLink, link);
            if (result) links.push(result);
        }
        if (links.length > 0) {
            headerLinks.replaceChildren(...links);
        } else {
            headerLinks.remove();
        }
    }
}

export { headerModule };
