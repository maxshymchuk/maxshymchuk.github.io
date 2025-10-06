const Doms = {
    Loader: document.getElementById('loader') as HTMLDivElement,
    Content: document.getElementById('content') as HTMLDivElement,

    Header: document.getElementById('header') as HTMLDivElement,
    Contacts: document.getElementById('contacts') as HTMLDivElement,
    Skills: document.getElementById('skills') as HTMLDivElement,
    Experience: document.getElementById('experiences') as HTMLDivElement,
    Projects: document.getElementById('projects') as HTMLDivElement,

    TemplateHeader: document.getElementById('template-header') as HTMLTemplateElement,
    TemplateContact: document.getElementById('template-contact') as HTMLTemplateElement,
    TemplateSkillsGroup: document.getElementById('template-skills-group') as HTMLTemplateElement,
    TemplateExperience: document.getElementById('template-experience') as HTMLTemplateElement,
    TemplateProject: document.getElementById('template-project') as HTMLTemplateElement,
};

const Const = {
    LocalStorage: 'cache',
    FileName: 'maxshymchuk-backup.json',
    Sources: {
        Vercel: 'https://maxshymchuk-github-io.vercel.app',
        Gist: 'https://api.github.com/gists/84b49b11e68e3ddc6a8ef0491bb477c9',
    },
};

export { Doms, Const };
