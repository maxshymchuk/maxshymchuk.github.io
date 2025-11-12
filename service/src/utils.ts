import { VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';
import { Request } from '@vercel/functions';
import database from './database';

function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

function jsonHandler<T>(sender: (req: Request) => T | Promise<T>) {
    return async (req: Request, res: VercelResponse) => {
        try {
            await database.open();
            const result = await sender(req);
            return res.json(result);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await database.close();
        }
    };
}

export { serialize, stringify, jsonHandler };
