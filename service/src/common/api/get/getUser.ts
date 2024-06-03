import { get } from '../share';

function mapUser(user: User): MappedUser {
    return {
        login: user.login,
        name: user.name || null,
        bio: user.bio || null,
        email: user.email || null,
        repos_url: user.repos_url
    };
}

async function getUser(url: string): Promise<MappedUser> {
    const userResponse = await get(url);
    const user = await userResponse.json() as User;
    return mapUser(user);
}

export { getUser };