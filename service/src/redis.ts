import { REDIS_URL } from './constants';
import Database from './database';
import RedisDriver from './database/drivers/redis';

const database = new Database(new RedisDriver(REDIS_URL), {
    data: 'data',
    telemetry: 'telemetry',
});

export default database;
