async function fetchData(url) {
    const result = await fetch(url, {
        method: 'GET',
        username: USERNAME,
        headers: {
            Accept: 'application/vnd.github+json'
        }
    });
    const parsed = await result.json();
    if (result.ok) return parsed;
    console.log(parsed.message);
    throw new Error(parsed.message);
}

export async function get(url, fallback) {
    if (DEV_MODE) return fallback;
    try {
        return await fetchData(url);
    } catch {
        return fallback;
    }
}