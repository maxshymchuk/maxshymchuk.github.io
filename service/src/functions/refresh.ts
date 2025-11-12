import database from '../database';

export default async () => {
    try {
        await database.open();
        await database.del(database.keys.data);
        return new Response('OK');
    } catch (error) {
        console.error(error);
        return new Response('FAILED');
    } finally {
        await database.close();
    }
};
