import { config } from 'dotenv';
import { jsonHandler } from '../utils';
import { VercelRequest } from '@vercel/node';
import { IncomingHttpHeaders } from 'http';

config({ override: true });

async function test(req: VercelRequest): Promise<IncomingHttpHeaders> {
    return req.headers;
}

export default jsonHandler(test);
