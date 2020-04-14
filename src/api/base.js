import axios from 'axios';
import config from '@/config';
import { savedLanguageKey } from '@/i18n';

const { API_HOST, API_TIMEOUT } = config;

const instance = axios.create({
  baseURL: API_HOST,
  timeout: API_TIMEOUT * 1000,
});
const filePostAxios = axios.create({
  baseURL: API_HOST,
  timeout: API_TIMEOUT * 1000,
});

const requestInterceptors = (config) => {
  if (!config.params) config.params = {};

  let languageKey = localStorage.getItem(savedLanguageKey);
  let loginToken = localStorage.getItem('loginToken');
  config.headers.language = languageKey;
  config.headers.loginToken = loginToken;
  config.params.language = languageKey;

  return config;
};

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(requestInterceptors, function(error) {
  return Promise.reject(error);
});
filePostAxios.interceptors.request.use(requestInterceptors, function(error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function(response) {
    if (typeof response.data === 'string' && response.data.match(/\t/)) {
      response.data = JSON.parse(response.data.replace(/\t/g, ''));
    }

    const data = response.data;
    const code = data.code;

    if (code !== 200 && code !== null) {
      return Promise.reject(data);
    }
    return data.data;
  },
  function(error) {
    const data = error.response && error.response.data;
    return Promise.reject(data || error);
  },
);

export const get = (url, params, options) =>
  instance.get(url, { ...options, params });
export const post = instance.post;
export const put = (url, params, options) => {
  return instance.post(url, params, options);
};
export const exportFile = (url, params, options) => {
  return filePostAxios.post(url, params, {
    ...options,
    responseType: 'blob',
  });
};

export default {
  get,
  post,
  put,
  exportFile,
};
