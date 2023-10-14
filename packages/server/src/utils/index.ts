// import chalk from 'chalk';
import dayjs = require('dayjs');

/**
 * 推迟执行
 * @param timeout 时间，毫秒
 * @returns
 */
export const delay = (timeout = 3000) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, timeout),
  );
};

/**
 * 控制台日志
 * @param message
 * @param optionalParams
 */
export const log = (message?: any, ...optionalParams: any[]) => {
  console.log(
    // chalk.green(dayjs().format('YYYY/MM/DD HH:mm:mm  |  ')),
    dayjs().format('YYYY/MM/DD HH:mm:mm  |  '),
    message,
    ...optionalParams,
  );
};

/**
 * 计算出A数组中相对于B少的项，并将所有少的返回
 * @returns
 */
export const findMissingItems = <T = any>(A: T[], B: T[]): T[] => {
  return A.filter((item) => !B.includes(item));
};
