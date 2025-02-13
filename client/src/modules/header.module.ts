function headerModule(user: MappedUser): void {
    const headerName = document.getElementById('header-name') as Nullable<HTMLElement>;
    const headerBio = document.getElementById('header-bio') as Nullable<HTMLElement>;
    const headerEmail = document.getElementById('header-links-email') as Nullable<HTMLAnchorElement>;
    if (headerName) {
        headerName.innerText = user.name ? user.name : user.login;
    }
    if (headerBio) {
        if (user.bio) {
            headerBio.innerText = user.bio;
        } else {
            headerBio.remove();
        }
    }
    if (headerEmail) {
        if (user.email) {
            headerEmail.href = `mailto:${user.email}`;
        } else {
            headerEmail.remove();
        }
    }
}

export { headerModule };