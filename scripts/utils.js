import { CONSTS } from './models.js';

export const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1));
        [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
    return arr;
}

export const getRepos = async () => {
    const response = await fetch(`https://api.github.com/users/${CONSTS.GITHUB_ID}/repos`);
    if (response.status === 200) {
        const repos = await response.json();
        return repos;
    } else {
        throw new Error("Can't fetch data");
    }
}