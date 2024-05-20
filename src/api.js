export const API = {
    getReposByUsername: (username) => `https://api.github.com/users/${username}/repos?type=all`,
}