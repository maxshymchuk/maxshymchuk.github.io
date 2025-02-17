const mapping: Record<Links, string> = {
    github: 'assets/github.svg',
    linkedin: 'assets/linkedin.svg',
    telegram: 'assets/telegram.svg',
    notion: 'assets/notion.svg',
    email: 'assets/email.svg',
};

function createLink(link: Links, url: string) {
    const aDom = document.createElement('a');
    const imgDom = document.createElement('img');
    const capitalized = `${link[0].toUpperCase()}${link.slice(1)}`;
    imgDom.setAttribute('src', mapping[link]);
    imgDom.setAttribute('alt', capitalized);
    imgDom.setAttribute('title', capitalized);
    aDom.setAttribute('href', url);
    aDom.setAttribute('target', '_blank');
    aDom.append(imgDom);
    return aDom;
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
    if (headerLinks) {
        if (Object.keys(custom.links).length > 0) {
            for (const link in custom.links) {
                const url = custom.links[link as Links];
                if (!url) continue;
                headerLinks.append(createLink(link as Links, url));
            }
        } else {
            headerLinks.remove();
        }
    }
}

export { headerModule };
