// @ts-ignore
import { getData } from './build.js';
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const data = await getData();
    return res.json(data);
}