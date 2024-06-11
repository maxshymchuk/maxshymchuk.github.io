import { VercelRequest, VercelResponse } from '@vercel/node';

function jsonHandler<T>(sender: (req: VercelRequest) => Promise<T>) {
    return async (req: VercelRequest, res: VercelResponse) => {
        return res.json(await sender(req));
    }
}

export { jsonHandler };