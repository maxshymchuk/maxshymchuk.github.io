import { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';

function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

function jsonHandler<T>(sender: (req: VercelRequest) => Promise<T>) {
    return async (req: VercelRequest, res: VercelResponse) => {
        return res.json(await sender(req));
    };
}

export { serialize, stringify, jsonHandler };
