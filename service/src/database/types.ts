interface DatabaseDriver<TKey extends string = string> {
    connect?(): Promise<void>;
    disconnect?(): Promise<void>;

    read<T>(key: TKey): Promise<Nullable<T>>;
    write<T>(key: TKey, data: T, options?: unknown): Promise<unknown>;
    add<T>(key: TKey, data: T | T[]): Promise<unknown>;
    del(key: TKey): Promise<unknown>;
}

export type { DatabaseDriver };
