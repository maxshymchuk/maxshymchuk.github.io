import { config } from 'dotenv';
import { jsonHandler } from '../utils';
import { geolocation } from '@vercel/functions';

config({ override: true });

export default jsonHandler(async (req) => {
    return geolocation(req);
});
