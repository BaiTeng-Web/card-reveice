import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Toast } from 'vant';
// 错误码
const codeMessage: Record<number, string> = {
  400: '请求错误',
  401: '登录已过期请重新登录',
  403: '访问被禁止。',
  404: '发出的请求是不存在的记录',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除',
  422: '验证错误',
  500: '服务器发生错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  20032: '该功能暂未对您开放',
  10025: '用户不存在',
};

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.MODE !== 'production' ? import.meta.env.VITE_APP_BASE_API : import.meta.env.VITE_APP_SERVER_URL as any,
  timeout: 5000,
});
const { CancelToken } = axios;
const source = CancelToken.source();

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config
    // 在发送请求之前做些什么
    const headers = {
      // 用crm的token发起请求
      // Authorization: youngDanStorage.get('token') ? youngDanStorage.get('token') : '',
      'Content-Type': 'application/json',
    };
    if (config.headers) {
      config.headers = { ...headers, ...config.headers } as any;
    } else {
      config.headers = headers as any;
    }

    config.cancelToken = source.token as any;
    return config;
  },
  (error: AxiosError) => Promise.resolve(error || '服务器异常'),
);

// 添加响应拦截器
instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === 200 || code === '200') {
      return response.data;
    }
    Toast(msg);
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response && response.status) {
      const { status, statusText } = response;
      const errorText = codeMessage[status] || statusText;
      Toast(errorText);
    } else if (!response) {
      Toast('您的网络发生异常，无法连接服务器');
    }
    return Promise.reject(error);
  },
);

export default instance;
