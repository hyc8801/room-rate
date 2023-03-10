// import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

export const headers: () => {[x:string]: string} = () => {
  // const { getItem } = localStorage;
  // TODO: 对应项目实际header配置
  return {
    // 'sc-id': `web-${uuidv4()}`,
    'scf-source': 'AHHX_WEB',
    'Cache-Control': 'no-cache',
  };
};


/**基于axios创建的实例，避免全局污染axios */
const request = axios.create({});

/**
 * 请求拦截功能配置
 * 1. 统一添加请求头headers
 */
request.interceptors.request.use(
  (config) => {
    // config.headers = { ...config.headers };
    return config;
  },
  (error) => {
    // Do something with request error
    // message.error(error);
    Promise.reject(error);
    return;
  },
);

/** 
  * 相应拦截功能配置
  * 1. 统一处理后端报错码code
  * 2. 统一处理特殊的状态码，如用户未登录/登陆过期
  * 3. 统一出http状态码异常情况
  * 4. 返回后端data数据
  */
request.interceptors.response.use(
  (response) => {
    const res = response.data || {};
    //  1. 二进制流文件无须处理，直接返回
    if (res instanceof Blob) {
      return response;
    }

    // 2. token过期，需要重新登陆~
    // TODO:具体code以后端为主，强制后端统一，不要出现多个
    // if (res.code === '002004') {
    //   // to login
    //   return;
    // }

    // 3. 后端返回code为'000000'视为成功,其余均视为失败，且将后端错误信息进行提示
    // if (res.code !== '000000') {
    //   message.error(res.msg || res.message?.[0]?.message || res.message || '网络异常，请稍后再试');
    //   return Promise.reject(res);
    // }

    // 4. 仅返回成功的数据
    return res;
  },
  (error) => {
    // 5. 处理http状态码非200情况
    // message.error(error?.response?.data?.message || String(error.message) || '网络异常，请稍后再试');
    return Promise.reject(error);
  },
);

export interface Request {
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
  get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  head<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  options<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  postForm<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  putForm<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  patchForm<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
}

export default request as Request;
