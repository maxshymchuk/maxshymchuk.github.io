import { kv } from '@vercel/kv';
import { Const } from '../common/constants';
import { stringify } from '../common/utils';

const keys = {
    data: 'data',
} as const;

async function write<T>(
    key: ValueOf<typeof keys>,
    data: T,
    expireSeconds?: number,
): Promise<Nullable<'OK' | T | string>> {
    return await kv.set(key, stringify(data), { ex: expireSeconds ?? Const.DefaultRequestIntervalMs / 1000 });
}

async function read<T>(key: ValueOf<typeof keys>): Promise<Nullable<T>> {
    return await kv.get<T>(key);
}

export default { keys, read, write };
