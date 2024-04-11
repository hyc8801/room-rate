import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
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
  return A?.filter((item) => !B.includes(item)) || [];
};

/** axios配置，取消验证 */
export const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

/** 读取配置文件 */
export const getConfig = (): Promise<{ projectList: string[] }> => {
  return new Promise((resolve, reject) => {
    const configPath = path.resolve(process.cwd(), './config.json');
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const config = JSON.parse(data);
          resolve(config);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

/**
 * 尝试将字符串转换为数字
 * @param str 要转换的字符串
 * @returns 转换后的数字，如果转换失败则返回0
 */
export function convertToNumber(str: string): number {
  const num = Number(str);
  if (isNaN(num)) {
    return 0;
  }
  return num;
}
