import { kv } from '@vercel/kv';
import { Const } from './constants';
import { stringify } from './utils';

const keys = {
    data: 'data',
} as const;

async function write<T>(key: ValueOf<typeof keys>, data: T): Promise<Nullable<'OK' | T | string>> {
    return await kv.set(key, stringify(data), { ex: Const.RequestIntervalMs / 1000 });
}

async function read<T>(key: ValueOf<typeof keys>): Promise<Nullable<T>> {
    return await kv.get<T>(key);
}

export default { keys, read, write };
