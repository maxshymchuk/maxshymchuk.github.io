import { get } from '../utils.js';

export default class UserLoader {
    static async get(url: string): Promise<MappedUser> {
        const userResponse = await get(url);
        if (!userResponse.ok) throw Error('Unable to load user');
        const user = await userResponse.json() as User;
        return {
            login: user.login,
            name: user.name || null,
            bio: user.bio || null,
            email: user.email || null,
            repos_url: user.repos_url
        };
    }
}