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
    async toJson() {
      const error = {
        error: `Can't convert to json`
      }
      return this.data ? await this.data.json() : error;
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
      status: result.status === 200 ? RESPONSE_STATUS.OK : RESPONSE_STATUS.ERROR
    }
  } catch {
    return {
      ...response,
      status: RESPONSE_STATUS.ERROR
    }
  }
}

export const getRepos = async () => {
  const response = await createRequest(`https://api.github.com/users/${CONSTS.GITHUB_ID}/repos`);
  return isConnected(response) ? response.toJson() : mock;
}

export const getRepoProperty = async (url, isForceUpdate = false) => {
  let result;
  return (async () => {
    if (result && !isForceUpdate) return result;
    const response = await createRequest(url);
    result = isConnected(response) ? response.toJson() : undefined;
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