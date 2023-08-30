const CONSTS = {
    LEFT_SLIDE_POS: '100vw',
    CENTER_SLIDE_POS: '0',
    RIGHT_SLIDE_POS: '-100vw',
    TRANSITION_TIME: 750,
};

export const API = {
    getLogoByLanguage: (language) => `https://cdn.jsdelivr.net/npm/programming-languages-logos/src/${language}/${language}.svg`,
    getReposByUsername: (username) => `https://api.github.com/users/${username}/repos?type=all`,
}

export default CONSTS;