import userData from '../../../data/userData';
import type { Api } from './types';

export const defaultApi: Api = {
    getData: async () => userData,
};
