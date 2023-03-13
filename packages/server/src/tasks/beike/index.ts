import { AREA_LIST } from '@room-rate/common';
import to from 'await-to-js';
import { createConnection } from 'mysql2/promise';
import { log } from '../../utils';
import { getDataByErshou } from './apis';

/**
 * 贝壳二手房数据爬取
 * @returns
 */
const beikeTask = async () => {
  // create the connection to database
  const connection = await createConnection({
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'DkdR/Ci5&pCV',
    database: 'blog',
  });
  try {
    for (let index = 0; index < AREA_LIST.length; index++) {
      const item = AREA_LIST[index];
      const [err, supply] = await to(
        getDataByErshou(item.id, item.name, item.district_pinyin),
      );
      if (err) {
        log('抓取接口失败~');
        console.log(err);
        return;
      }
      const [err2] = await to(
        connection.query(`insert into beike set ?`, supply),
      );
      if (err2) {
        log('插入数据失败~');
        console.log(err2);
        return;
      }
      log(`抓取区域爬取成功~ ${item.name}`);
    }
    log(`🎉贝壳数据抓取结束~`);
  } catch (error) {
    log('抓取失败~');
    console.log(error);
  }
  connection.end();
};

export default beikeTask;
