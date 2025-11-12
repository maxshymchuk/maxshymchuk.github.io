import { getStaticDataByCountry } from '../../share';

const ref =
    'lorem ipsum dolor sit amet consectetur adipisicing elit optio ipsum incidunt nam praesentium cumque dolores deserunt amet temporibus libero non veniam sunt mollitia culpa architecto totam assumenda distinctio tempore commodi';

const words = ref.split(' ');

function selectWords(amount: number) {
    const selected: Array<string> = [];
    for (let i = 0; i < amount; i++) {
        selected.push(words[Math.trunc(Math.random() * words.length)]);
    }
    return selected;
}

function mergeWords(amount: number) {
    return selectWords(amount).join(' ');
}

const meta: Meta = {
    timestamp: Date.now(),
    expired: Date.now(),
    snapshot: '',
};

const user: MappedUser = {
    login: 'maxshymchuk',
    name: 'Max Shymchuk',
    bio: 'Frontend Developer since 2019',
};

const repositories = Array.from(Array(10)).map(() => ({
    name: mergeWords(3),
    description: mergeWords(10),
    stars: Math.trunc(Math.random() * 10),
    site: mergeWords(1),
    release: mergeWords(1),
    page: mergeWords(1),
    topics: selectWords(5),
    archived: !!Math.round(Math.random()),
}));

export default async () => {
    const staticData = getStaticDataByCountry(import.meta.env.VITE_DEV_COUNTRY);
    return {
        meta,
        payload: { ...staticData, user, repositories },
    };
};
