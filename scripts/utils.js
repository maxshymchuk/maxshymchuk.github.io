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

export async function get(url, fallback) {
    if (DEV_MODE) return fallback;
    try {
        const result = await fetch(url, {
            method: 'GET',
            username: USERNAME,
            headers: {
                Accept: 'application/vnd.github+json'
            }
        });
        return result.json();
    } catch {
        return fallback;
    }
}