import database from '../database';
import { config } from 'dotenv';
import { jsonHandler } from '../utils';

config({ override: true });

async function refresh() {
    await database.del('data');
}

export default jsonHandler(refresh);
