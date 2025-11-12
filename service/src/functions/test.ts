import { geolocation, Request } from '@vercel/functions';

export default {
    async fetch(req: Request) {
        const geo = geolocation(req);
        return Response.json(geo);
    },
};
