import axios from 'axios'

export let baseUrl = 'http://localhost:5000';
// export let baseUrl = 'http://8.135.98.41';

// https://www.jianshu.com/p/3fd32b4e202d
// axios允许跨域存储cookie
// let xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
axios.defaults.withCredentials = true

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://124.70.139.125:5000',
    baseURL: baseUrl,
    timeout: 12000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标
    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    return config
  })


  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  })

  // 3.发送真正的网络请求
  return instance(config)
}

export function longTimeRequest(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://124.70.139.125:5000',
    baseURL: baseUrl,
    timeout: 1000 * 60 * 30, //坚持30min,
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标
    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    return config
  })


  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  })

  // 3.发送真正的网络请求
  return instance(config)
}

