import { AREA_LIST } from '@room-rate/common';
import to from 'await-to-js';
import { createConnection } from 'mysql2/promise';
import { log } from '../../utils';
import { getDataByErshou } from './apis';
import { connectionOptions } from 'src/utils/db';
import { INestApplication } from '@nestjs/common';

/**
 * 贝壳二手房数据爬取
 * @returns
 */
export const beikeAreaTaks = async (app: INestApplication) => {
  // create the connection to database
  const connection = await createConnection(connectionOptions);
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
      log(`抓取区域抓取成功~ ${item.name}`);
    }
    log(`🎉🎉🎉[贝壳]区域数据结束抓取~`);
  } catch (error) {
    log('抓取失败~');
    console.log(error);
  }
  connection.end();
};

export default beikeAreaTaks;
