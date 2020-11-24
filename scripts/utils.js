import CONSTS from './consts.js';
import mock from './mock.js';

export const RESPONSE_STATUS = {
  OK: 'OK',
  ERROR: 'ERROR'
}

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

export const isConnected = (response) => {
  return response.status === RESPONSE_STATUS.OK;
}

export const createRequest = async (url) => {
  const response = {
    status: RESPONSE_STATUS.ERROR,
    data: undefined,
    toJson() {
      const error = {
        error: `Can't convert to json`
      }
      return response.data ? response.data.json() : error;
    }
  };
  try {
    const result = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Origin': 'no-referrer',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'GET'
      }
    });
    return {
      ...response,
      data: result,
      status: response.status == 200 ? RESPONSE_STATUS.OK : RESPONSE_STATUS.ERROR
    }
  } catch {
    return {
      ...response,
      status: RESPONSE_STATUS.ERROR
    }
    throw new Error(`Can't fetch data`);
  }
}

export const getRepos = async () => {
  const repos = await createRequest(`https://api.github.com/users/${CONSTS.GITHUB_ID}/repos`);
  return isConnected(repos) ? repos.toJson() : mock;
}

export const getRepoProperty = async (url, isForceUpdate = false) => {
  let result;
  return (async () => {
    if (result && !isForceUpdate) return result;
    const request = await createRequest(url);
    result = request.toJson();
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