import { CACHE_VERSION, INVALIDATE_DELAY_MS, LS_CACHE_KEY } from '../constants';

function isCacheData(test: object): test is CacheData {
    return 'version' in test && 'ttl' in test && 'data' in test;
}

function createCacheData(data: DynamicData): CacheData {
    return {
        version: CACHE_VERSION,
        ttl: Date.now() + INVALIDATE_DELAY_MS,
        data,
    };
}

const cache = {
    get: (): Nullable<DynamicData> => {
        const value = localStorage.getItem(LS_CACHE_KEY);
        if (!value) return null;
        try {
            const cacheData = JSON.parse(value);
            if (!isCacheData(cacheData) || cacheData.version !== CACHE_VERSION || Date.now() > cacheData.ttl) {
                cache.delete();
                return null;
            }
            return cacheData.data;
        } catch {
            cache.delete();
            return null;
        }
    },
    set: (data: DynamicData) => {
        const cacheData = createCacheData(data);
        return localStorage.setItem(LS_CACHE_KEY, JSON.stringify(cacheData));
    },
    delete: () => localStorage.removeItem(LS_CACHE_KEY),
};

export default cache;
