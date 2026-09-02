import type { Api } from './types';

export const defaultApi: Api = {
    getData: async () => ({ projects: [] }),
};
