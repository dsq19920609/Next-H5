import * as axios from 'axios';

const baseUrl = 'http://81.68.185.126:3003';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 300000,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的 状态码在200-300间才resolve,其他reject
  },
});

instance.interceptors.request.use((config) => {
  return config;
});


instance.interceptors.response.use(
  (response) => {
    if (!response) {
      return Promise.reject('Sorry, the server is abnormal');
    } else {
      if (response.status === 200) {
        const result = response.data;
        if (result.resultCode === '0') {
          return Promise.resolve(result.resultData);
        } else {
          return Promise.reject(result);
        }
      }
      if (response.status === 204) {
        const result = response.data;
        return Promise.resolve(result.resultData);
      }
    }
  },
  (error) => {
    return Promise.reject(error.message);
  },
);

function get(options) {
  const { url, params, ...config } = options;
  return new Promise((resolve, reject) => {
    instance
      .get(`${baseUrl}${url}`, {
        params,
        ...config,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function post(options) {
  const { url, data, ...config } = options;
  return new Promise((resolve, reject) => {
    instance
      .post(`${baseUrl}${url}`, data, {
        ...config,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//并发请求 必须全部请求成功, 才返回成功, 返回结果顺序和请求顺序相同
function all(options) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new TypeError('params must be an array');
  }
  return new Promise((resolve, reject) => {
    axios
      .all(options)
      .then(
        axios.spread(function (...result) {
          resolve(result);
        }),
      )
      .catch((error) => {
        reject(error);
      });
  });
}


export { get, post, all, baseUrl };
