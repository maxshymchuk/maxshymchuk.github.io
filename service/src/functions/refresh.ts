import database from '../database';
import { config } from 'dotenv';
import { jsonHandler } from '../utils';

config({ override: true });

export default jsonHandler(async () => {
    return database.del(database.keys.data);
});
