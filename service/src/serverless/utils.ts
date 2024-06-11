import { VercelRequest, VercelResponse } from '@vercel/node';

function jsonHandler<T>(sender: () => Promise<T>) {
    return async (req: VercelRequest, res: VercelResponse) => {
        return res.json(await sender());
    }
}

export { jsonHandler };