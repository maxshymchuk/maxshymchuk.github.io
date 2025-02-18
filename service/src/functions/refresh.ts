import database from '../database';
import { config } from 'dotenv';
import { jsonHandler } from '../utils';

config({ override: true });

async function refresh() {
    try {
        const res = await database.del('data');
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default jsonHandler(refresh);
