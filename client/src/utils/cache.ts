import { Const } from '../constants';

function getCache(): Data | null {
    const value = localStorage.getItem(Const.LocalStorage);
    try {
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
}

function setCache(value: Data) {
    localStorage.setItem(Const.LocalStorage, JSON.stringify(value));
}

export { getCache, setCache };
