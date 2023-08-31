export function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const pos = Math.round(Math.random() * (arr.length - 1));
        [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
    return arr;
}

function check(list, coords) {
    if (coords.x === 0 && coords.y === 0) return false;
    return list.reduce((result, item) => result && (item.x !== coords.x || item.y !== coords.y), true);
}

export function place(projects, placement = [], base = -1) {
    let removed = 0;
    const basedPlacement = placement[base] ?? { x: 0, y: 0 };
    const shifts = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
    ];
    const newPlacement = [];
    for (let i = 0; i < 4; i++) {
        const coords = { x: basedPlacement.x + shifts[i].x, y: basedPlacement.y + shifts[i].y };
        if (projects[removed] && check(placement, coords)) {
            newPlacement.push({ ...projects[removed], ...coords });
            removed++;
        }
    }
    const newProjects = projects.slice(removed - 1, -1);
    if (newProjects.length === 0) {
        return newPlacement;
    } else {
        return [...newPlacement, ...place(newProjects, [...placement, ...newPlacement], ++base)];
    }
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