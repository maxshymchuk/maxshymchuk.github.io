import { createClient } from 'redis';
import { Const } from './constants';
import { stringify } from './utils';

const keys = {
    data: 'data',
} as const;

const redis = await createClient().connect();

async function write<T>(key: ValueOf<typeof keys>, data: T): Promise<Nullable<string>> {
    return redis.set(key, stringify(data), { expiration: { type: "PX", value: Const.RequestIntervalMs } });
}

async function read<T>(key: ValueOf<typeof keys>): Promise<Nullable<T>> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
}

async function del(key: ValueOf<typeof keys>): Promise<number> {
    return redis.del(key);
}

export default { keys, read, write, del };
