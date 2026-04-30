import userData from '../../../data/user-data.json';
import type { Api } from './types';

export const defaultApi: Api = {
    getData: async () => userData,
};
