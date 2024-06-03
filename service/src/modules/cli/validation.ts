import { resolve } from 'path';
import { appendFile } from 'fs/promises';
import { Options } from './types.js';
import { OptionValues } from 'commander';

async function getValidPath(value: unknown): Promise<string> {
    if (typeof value !== 'string') throw Error('Value is not a string');
    const resolved = resolve(value);
    await appendFile(resolved, '');
    return resolved;
}

async function getValidInterval(value: unknown): Promise<number> {
    if (typeof value !== 'number' && typeof value !== 'string') throw Error('Value is not a string or number');
    if (isNaN(+value)) throw Error('Value is not a number');
    return +value;
}

async function getValidOpts(opts: OptionValues): Promise<Options> {
    const { dataPath, logPath, requestInterval, yes } = opts;

    return {
        dataPath: await getValidPath(dataPath),
        logPath: await getValidPath(logPath),
        requestInterval: await getValidInterval(requestInterval),
        skip: !!yes
    }
}

export { getValidOpts };