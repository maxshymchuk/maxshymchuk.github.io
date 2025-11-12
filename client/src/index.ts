import { getData } from './api';
import { Const } from './constants';
import { createLoader, parseGist } from './utils';
import { getCache, setCache } from './utils/cache';
import renderHeader from './renderers/header';
import renderContacts from './renderers/contacts';
import renderAbout from './renderers/about';
import renderSkills from './renderers/skills';
import renderExperiences from './renderers/experiences';
import renderProjects from './renderers/projects';
import { DOMS } from './doms';

const loaders = [
    createLoader(Const.Sources.Vercel),
    createLoader({
        url: Const.Sources.Gist,
        headers: {
            Accept: 'application/vnd.github.raw+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        parser: parseGist,
    }),
];

async function load(): Promise<Data> {
    if (import.meta.env.DEV) {
        const mock = await import('./mock');
        return mock.default();
    }
    const cache = getCache();
    if (cache && Date.now() < cache.meta.expired) return cache;
    const data = await getData(loaders);
    setCache(data);
    return data;
}

async function initialize() {
    DOMS.Loader.node.classList.remove('invisible');
    DOMS.Content.node.classList.add('invisible');

    try {
        const { meta, payload } = await load();

        renderHeader(payload.user, payload.contacts);
        renderContacts(payload.contacts);
        renderAbout(payload.about);
        renderSkills(payload.skills);
        renderExperiences(payload.experiences);
        renderProjects(payload.repositories);

        console.log(`Updated at ${new Date(meta.timestamp).toLocaleString()}`);

        DOMS.Loader.node.classList.add('invisible');
        DOMS.Content.node.classList.remove('invisible');
    } catch (error) {
        DOMS.Loader.node.innerText = 'Error :(';
        console.error(error);
    }
}

window.addEventListener('load', () => void initialize());
