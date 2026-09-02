import renderProjects from './renderers/projects';
import { API_URL } from './constants';
import cache from './utils/cache';
import fetcher from './utils/fetcher';

async function load(): Promise<Nullable<DynamicData>> {
    try {
        const cached = cache.get();
        if (cached) return cached;
        const data = await fetcher<DynamicData>('get', API_URL);
        cache.set(data);
        return data;
    } catch {
        return null;
    }
}

async function initialize() {
    const data = await load();
    if (data?.projects) renderProjects(data.projects);
}

window.addEventListener('load', () => void initialize());
