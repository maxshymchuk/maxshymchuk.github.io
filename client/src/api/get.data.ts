import type { Loader } from '../utils/loader';

async function getData(loaders: Array<Loader>): Promise<Data> {
    for (let loader of loaders) {
        try {
            return await loader();
        } catch (error) {
            console.error(error);
        }
    }
    throw Error('Can\'t load data');
}

export { getData };