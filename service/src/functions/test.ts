import { geolocation, Request } from '@vercel/functions';
import { config } from 'dotenv';

config({ override: true });

// export default (req: Request) => {
//     try {
//         const geo = geolocation(req);
//         console.log(geo);
//         return Response.json(geo);
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

export default {
    async fetch(req: Request) {
        const geo = geolocation(req);
        return Response.json(geo);
    },
};
