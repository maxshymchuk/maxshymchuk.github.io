import type { DatabaseDriver } from './types';

class Database<TKey extends string = string> implements DatabaseDriver<TKey> {
    public readonly keys: Record<TKey, TKey>;
    private readonly driver: DatabaseDriver<TKey>;

    private pendingConnect: Nullable<Promise<void>> = null;
    private pendingDisconnect: Nullable<Promise<void>> = null;

    constructor(driver: DatabaseDriver<TKey>, keys: Record<TKey, TKey>) {
        this.driver = driver;
        this.keys = keys;
    }

    private async ensureConnected(): Promise<void> {
        if (!this.driver.connect) return;

        if (this.pendingDisconnect) {
            await this.pendingDisconnect;
        }

        if (!this.pendingConnect) {
            this.pendingConnect = this.driver.connect().finally(() => {
                this.pendingConnect = null;
            });
        }

        await this.pendingConnect;
    }

    public async open() {
        await this.ensureConnected();
    }

    public async close() {
        if (!this.driver.disconnect) return;

        if (this.pendingConnect) {
            await this.pendingConnect;
        }

        if (!this.pendingDisconnect) {
            this.pendingDisconnect = this.driver.disconnect().finally(() => {
                this.pendingDisconnect = null;
            });
        }

        await this.pendingDisconnect;
    }

    public async read<T>(key: TKey) {
        await this.ensureConnected();
        return this.driver.read<T>(key);
    }

    public async write<T>(key: TKey, data: T, options?: unknown) {
        await this.ensureConnected();
        return this.driver.write<T>(key, data, options);
    }

    public async add<T>(key: TKey, data: T | T[]) {
        await this.ensureConnected();
        return this.driver.add<T>(key, data);
    }

    public async del(key: TKey) {
        await this.ensureConnected();
        return this.driver.del(key);
    }
}

export default Database;
