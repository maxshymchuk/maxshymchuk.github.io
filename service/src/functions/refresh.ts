import database from '../database';
import { config } from 'dotenv';
import { jsonHandler } from '../utils';

config({ override: true });

async function refresh() {
    try {
        await database.open();
        await database.del('data');
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await database.close();
    }
}

export default jsonHandler(refresh);
