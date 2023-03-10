// import chalk from 'chalk';
import dayjs = require('dayjs');

/**
 * 推迟执行
 * @param timeout 时间，毫秒
 * @returns
 */
export const delay = (timeout: number) => {
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
