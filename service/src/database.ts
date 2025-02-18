import { kv } from '@vercel/kv';
import { Const } from './constants';
import { stringify } from './utils';

const keys = {
    data: 'data',
} as const;

async function write<T>(key: ValueOf<typeof keys>, data: T): Promise<Nullable<string>> {
    return kv.set(key, stringify(data), { ex: Const.RequestIntervalMs / 1000 });
}

async function read<T>(key: ValueOf<typeof keys>): Promise<Nullable<T>> {
    return kv.get<T>(key);
}

async function del(key: ValueOf<typeof keys>): Promise<number> {
    return kv.del(key);
}

export default { keys, read, write, del };
