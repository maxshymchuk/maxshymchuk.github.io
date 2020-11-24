import CONSTS from './consts.js';
import mock from './mock.js';

export const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    [arr[i], arr[pos]] = [arr[pos], arr[i]];
  }
  return arr;
}

export const rand = (a, b) => {
  return Math.trunc(Math.random() * (b - a)) + a;
}

export const createRequest = async (url) => {
  let response;
  try {
    response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Origin': 'no-referrer',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'GET'
      }
    });
    return response;
  } catch {
    throw new Error("Can't fetch data");
  } finally {
    return false;
  }
}

export const getRepos = async () => {
  const repos = await createRequest(`https://api.github.com/users/${CONSTS.GITHUB_ID}/repos`);
  return repos ? repos.json() : mock;
}

export const getRepoProperty = async (url, isForceUpdate = false) => {
  let result;
  return (async () => {
    if (result && !isForceUpdate) return result;
    const request = await createRequest(url);
    result = request ? await request.json() : false;
    return result;
  })();
}

export class Preloader {
  static show() {
    const element = document.getElementById('preloader');
    element.style.opacity = '1';
    element.style.visibility = 'visible';
  }

  static hide() {
    const element = document.getElementById('preloader');
    element.style.opacity = '0';
    element.style.visibility = 'hidden';
  }
}