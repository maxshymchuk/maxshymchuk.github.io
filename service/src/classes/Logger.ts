import { appendFileSync } from 'fs';

type Options = {
    toFile: boolean;
    toScreen: boolean;
    withTimestamp: boolean;
}

class Logger {
    private _padding = 25;
    private _toScreen = true;
    private _toFile = true;
    private _withTimestamp = true;

    constructor(toScreen?: boolean, toFile?: boolean, withTimestamp?: boolean) {
        if (toScreen !== undefined) this._toScreen = toScreen;
        if (toFile !== undefined) this._toFile = toFile;
        if (withTimestamp !== undefined) this._withTimestamp = withTimestamp;
    }

    private _log(text: string): void {
        process.stdout.write(text, 'utf8');
    }

    private _appendToFile(text: string): void {
        appendFileSync(globalThis.logPath, text);
    }

    private _updateFromOptions(options?: Partial<Options>): void {
        this._toScreen = options?.toScreen ?? this._toScreen;
        this._toFile = options?.toFile ?? this._toFile;
        this._withTimestamp = options?.withTimestamp ?? this._withTimestamp;
    }

    get padding(): number {
        return this._padding;
    }

    set padding(value: number) {
        this._padding = value;
    }

    public fromStartScreen(): Logger {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        return this;
    }

    public clearScreen(): Logger {
        process.stdout.cursorTo(0, 0);
        process.stdout.clearScreenDown();
        return this;
    }

    public newLine(options?: Partial<Options>): Logger {
        this._updateFromOptions(options);
        if (this._toScreen) this._log('\n');
        if (this._toFile) this._appendToFile('\n');
        return this;
    }

    public log(text: string, options?: Partial<Options>): Logger {
        this._updateFromOptions(options);
        const timestamp = (options?.withTimestamp ?? this._withTimestamp) ? `[${(new Date()).toISOString()}] ` : '';
        const textLine = `${timestamp}${text}`;
        if (this._toScreen) this._log(textLine);
        if (this._toFile) this._appendToFile(textLine);
        return this;
    }

    public logKeyValueScreen(dictionary: Array<{ key: string; value: string }>, padding?: number): Logger {
        const currentPadding = padding ?? this.padding;
        for (let item of dictionary) {
            const key = item.key.slice(0, currentPadding - 1);
            this._log(key.padEnd(currentPadding) + item.value + '\n');
        }
        return this;
    }
}

export const logger = (...args: ConstructorParameters<typeof Logger>) => new Logger(...args);