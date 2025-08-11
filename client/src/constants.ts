const Doms = {
    Loader: document.getElementById('loader') as HTMLDivElement,
    Content: document.getElementById('content') as HTMLDivElement,

    HeaderName: document.getElementById('header-name') as HTMLHeadingElement,
    HeaderBio: document.getElementById('header-bio') as HTMLHeadingElement,
    HeaderLinks: document.getElementById('header-links') as HTMLDivElement,

    ProjectsList: document.getElementById('projects-list') as HTMLDivElement,
    ProjectsTemplate: document.getElementById('template-repo') as HTMLTemplateElement,

    FooterUpdatedAt: document.getElementById('updated-at') as HTMLDivElement,
};

const Const = {
    LocalStorage: 'maxshymchuk-data',
    FileName: 'maxshymchuk-backup.json',

    Sources: {
        Vercel: 'https://maxshymchuk-github-io.vercel.app',
        Gist: 'https://api.github.com/gists/84b49b11e68e3ddc6a8ef0491bb477c9',
    },
};

export { Doms, Const };
