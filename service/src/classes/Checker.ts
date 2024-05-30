import { Constants, Global } from '../constants';
import { resolve } from 'path';

class Checker {
    public static path = resolve(Global.__dirname, Constants.defaultDataPath);
    public static requestInterval = Constants.defaultRequestIntervalMs;

    private _timestamp: Nullable<number> = null;
    private _snapshot: Nullable<string> = null;

    get timestamp(): Nullable<number> {
        return this._timestamp;
    }

    set timestamp(value: Nullable<number>) {
        this._timestamp = value;
    }

    get snapshot(): Nullable<string> {
        return this._snapshot;
    }

    set snapshot(value: Nullable<string>) {
        this._snapshot = value;
    }

    get isUpToDate(): boolean {
        if (!this.timestamp) return false;
        return Date.now() - this.timestamp < Checker.requestInterval
    }

    public isEqualSnapshot(snapshot: string): boolean {
        return this.snapshot === snapshot;
    }
}

export { Checker };