import renderHeader from './renderers/header';
import renderContacts from './renderers/contacts';
import renderAbout from './renderers/about';
import renderSkills from './renderers/skills';
import renderExperiences from './renderers/experiences';
import renderProjects from './renderers/projects';
import { DOMS } from './doms';
import { API_URL } from './constants';
import userData from '../../data/userData';
import cache from './utils/cache';
import fetcher from './utils/fetcher';

async function load(): Promise<UserData> {
    try {
        const cached = cache.get();
        if (cached) return cached;
        const data = await fetcher<UserData>('get', API_URL);
        cache.set(data);
        return data;
    } catch {
        return userData;
    }
}

async function initialize() {
    DOMS.Loader.node.classList.remove('invisible');
    DOMS.Content.node.classList.add('invisible');

    try {
        const data = await load();

        renderHeader(data.user, data.contacts);
        renderContacts(data.contacts);
        renderAbout(data.about);
        renderSkills(data.skills);
        renderExperiences(data.experiences);
        renderProjects(data.repositories);

        DOMS.Loader.node.classList.add('invisible');
        DOMS.Content.node.classList.remove('invisible');
    } catch (error) {
        DOMS.Loader.node.innerText = 'Error :(';
        console.error(error);
    }
}

window.addEventListener('load', () => void initialize());
