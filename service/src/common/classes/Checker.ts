import { Const } from '../constants';
import { resolve } from 'path';
import { serialize } from '../utils';
import { getUserData } from '../api';

type Check = {
    isEqual: boolean;
    data: Nullable<Data>;
};

class Checker {
    public static path = resolve(Const.DefaultDataPath);
    public static requestInterval = Const.DefaultRequestIntervalMs;

    private _data: Nullable<Data> = null;
    private _timestamp: Nullable<number> = null;
    private _snapshot: Nullable<string> = null;

    constructor(data?: Nullable<Data>) {
        this._data = data ?? null;
        this._timestamp = data ? data.meta.timestamp : null;
        this._snapshot = data ? data.meta.snapshot : null;
    }

    get data(): Nullable<Data> {
        return this._data;
    }

    get timestamp(): Nullable<number> {
        return this._timestamp;
    }

    get snapshot(): Nullable<string> {
        return this._snapshot;
    }

    get isUpToDate(): boolean {
        if (!this.timestamp) return false;
        return Date.now() - this.timestamp < Checker.requestInterval;
    }

    public async check(): Promise<Check> {
        if (this.isUpToDate) return { isEqual: true, data: this._data };

        this._timestamp = Date.now();

        const { user, repositories } = await getUserData();
        const snapshot = serialize(repositories);

        if (this.snapshot === snapshot) return { isEqual: true, data: this._data };

        this._snapshot = snapshot;

        this._data = {
            meta: { timestamp: this.timestamp as number, snapshot: this.snapshot as string },
            data: { user, repositories },
        };

        return { isEqual: false, data: this._data };
    }
}

export { Checker };
