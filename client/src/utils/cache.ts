import { INVALIDATE_DELAY_MS, LS_CACHE_KEY } from '../constants';

type Cached<T> = { timestamp: number; payload: T };

function isUserData(test: object): test is Cached<UserData> {
    return 'timestamp' in test && 'user' in test;
}

const cache = {
    get: (): Nullable<UserData> => {
        const value = localStorage.getItem(LS_CACHE_KEY);
        if (!value) return null;
        try {
            const cached = JSON.parse(value);
            if (!isUserData(cached)) return null;
            if (Date.now() >= cached.timestamp + INVALIDATE_DELAY_MS) {
                cache.delete();
                return null;
            }
            return cached.payload;
        } catch {
            cache.delete();
            return null;
        }
    },
    set: (payload: UserData) => {
        const value = { timestamp: Date.now(), payload: payload };
        return localStorage.setItem(LS_CACHE_KEY, JSON.stringify(value));
    },
    delete: () => localStorage.removeItem(LS_CACHE_KEY),
};

export default cache;
