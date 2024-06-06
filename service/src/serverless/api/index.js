import { getData } from './build.js';

export default async function handler(req, res) {
    const data = await getData();
    return res.json(data);
}