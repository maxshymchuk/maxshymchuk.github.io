import database from '../database';

export default {
    async fetch() {
        try {
            await database.open();
            await database.del(database.keys.data);
            await database.del(database.keys.dataCIS);
            return new Response('OK');
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await database.close();
        }
    },
};
