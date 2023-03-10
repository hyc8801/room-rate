/**
 * 贝壳找房请求中间件
 * @param {*} promise axios请求
 * @returns
 */
export const requestMiddleware = async (promise: Promise<any>) => {
  const res = await promise.then();
  const { status, data } = res;
  if (status === 200 && data.code === 100000) {
    return data.data.data;
  }
  return Promise.reject(data.data.error_msg || data.msg);
};
