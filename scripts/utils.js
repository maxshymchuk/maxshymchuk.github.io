export function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1));
        [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
    return arr;
}

export function rand(a, b) {
    return Math.trunc(Math.random() * (b - a)) + a;
}

async function fetchData(url) {
    const result = await fetch(url, {
        method: 'GET',
        username: USERNAME,
        headers: {
            Accept: 'application/vnd.github+json'
        }
    });
    if (result.ok) return result.json();
    const error = await result.json();
    console.log(error.message);
    throw new Error(error.message);
}

export async function get(url, fallback) {
    if (DEV_MODE) return fallback;
    try {
        return await fetchData(url);
    } catch {
        return fallback;
    }
}