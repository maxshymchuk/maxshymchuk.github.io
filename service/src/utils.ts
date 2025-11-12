import { VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';
import database from './database';

function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

function jsonHandler<T>(sender: (req: Request) => Promise<T>) {
    return async (req: Request, res: VercelResponse) => {
        try {
            await database.open();
            return res.json(await sender(req));
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await database.close();
        }
    };
}

export { serialize, stringify, jsonHandler };
