async function fetchData(url, username) {
    const result = await fetch(url, {
        method: 'GET',
        username,
        headers: {
            Accept: 'application/vnd.github+json'
        }
    });
    const parsed = await result.json();
    if (result.ok) return parsed;
    console.log(parsed.message);
    throw new Error(parsed.message);
}

export async function get(url, username, fallback) {
    if (DEV_MODE) return fallback;
    try {
        return await fetchData(url, username);
    } catch {
        return fallback;
    }
}