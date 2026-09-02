function handler<T extends HTMLElement>(id: string) {
    return {
        key: id,
        get node() {
            return document.getElementById(id) as T;
        },
    };
}

const DOMS = {
    Projects: handler<HTMLDivElement>('projects'),
    TemplateProject: handler<HTMLTemplateElement>('template-project'),
};

export { DOMS };
