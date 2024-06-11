import { kv } from '@vercel/kv';
import { config } from 'dotenv';
import { Constants } from '../common/constants';
import { stringify } from '../common/utils';

config({ override: true });

const keys = {
    data: 'data'
} as const;

async function write<T>(key: ValueOf<typeof keys>, data: T, expireSeconds?: number): Promise<Nullable<'OK' | T | string>> {
    return await kv.set(key, stringify(data), { ex: expireSeconds ?? (Constants.defaultRequestIntervalMs / 1000) });
}

async function read<T>(key: ValueOf<typeof keys>): Promise<Nullable<T>> {
    return await kv.get<T>(key);
}

export default { keys, read, write };