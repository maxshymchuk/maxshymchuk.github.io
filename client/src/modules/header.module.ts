async function renderLink({ key, title, url }: Link): Promise<Node> {
    const link = document.createElement('a');
    link.setAttribute('class', 'header-link');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('title', title);
    try {
        const content = await import(`../assets/${key}.svg?raw`);
        link.innerHTML = content.default;
    } catch {
        link.innerText = title;
    }
    return link;
}

async function headerModule(user: MappedUser, custom: Custom): Promise<void> {
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
    if (headerLinks) {
        if (custom.links.length > 0) {
            return Promise.all(custom.links.map(renderLink)).then((links) => headerLinks.append(...links));
        } else {
            headerLinks.remove();
        }
    }
}

export { headerModule };
