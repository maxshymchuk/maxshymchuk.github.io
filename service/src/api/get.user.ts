import { Const } from '../constants';
import { get } from './share';

function mapUser(user: User): MappedUser {
    return {
        login: user.login,
        name: user.name || null,
        bio: user.bio || null,
        repos_url: user.repos_url,
    };
}

async function getUser(): Promise<MappedUser> {
    if (!process.env.USER) throw Error(Const.Error.EnvUser);
    const userResponse = await get(`https://api.github.com/users/${process.env.USER}`);
    const user = (await userResponse.json()) as User;
    return mapUser(user);
}

export { getUser };
