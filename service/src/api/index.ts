import { defaultApi } from './constants';
import type { Adapter, Api } from './types';

function api(adapter?: Adapter): Api {
    return {
        ...defaultApi,
        ...adapter?.(defaultApi),
    };
}

export default api;
