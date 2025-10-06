function handler<T extends HTMLElement>(id: string) {
    return {
        key: id,
        get node() {
            return document.getElementById(id) as T;
        },
    };
}

const DOMS = {
    Loader: handler<HTMLDivElement>('loader'),
    Content: handler<HTMLDivElement>('content'),

    About: handler<HTMLDivElement>('about'),
    Header: handler<HTMLDivElement>('header'),
    Contacts: handler<HTMLDivElement>('contacts'),
    Skills: handler<HTMLDivElement>('skills'),
    Experience: handler<HTMLDivElement>('experiences'),
    Projects: handler<HTMLDivElement>('projects'),

    TemplateHeader: handler<HTMLTemplateElement>('template-header'),
    TemplateContact: handler<HTMLTemplateElement>('template-contact'),
    TemplateSkillsGroup: handler<HTMLTemplateElement>('template-skills-group'),
    TemplateExperience: handler<HTMLTemplateElement>('template-experience'),
    TemplateProject: handler<HTMLTemplateElement>('template-project'),
};

export { DOMS };
