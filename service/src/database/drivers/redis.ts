import { createClient, type RedisClientType, type SetOptions } from 'redis';
import { stringify } from '../../utils';
import type { DatabaseDriver } from '../types';

class RedisDriver<TKey extends string = string> implements DatabaseDriver<TKey> {
    private readonly client: RedisClientType;

    constructor(url: string) {
        this.client = createClient({ url });
    }

    public async connect() {
        if (this.client.isReady) return;
        if (this.client.isOpen) return;

        await this.client.connect();
    }

    public async disconnect() {
        if (!this.client.isOpen) return;

        await this.client.quit();
    }

    public async read<T>(key: TKey) {
        const value = await this.client.get(key);
        if (!value) return null;
        try {
            const parsed = JSON.parse(value);
            return parsed as T;
        } catch {
            return null;
        }
    }

    public async write<T>(key: TKey, data: T, options?: SetOptions) {
        return this.client.set(key, stringify(data), options);
    }

    public async add<T>(key: TKey, data: T | T[]) {
        return this.client.sAdd(key, Array.isArray(data) ? data.map((item) => stringify(item)) : stringify(data));
    }

    public async del(key: TKey) {
        return this.client.del(key);
    }
}

export default RedisDriver;
