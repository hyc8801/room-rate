/**
 * 新房数据
 * https://www.cq315house.com/HtmlPage/serviceSeaList.html?projectname=%E6%8B%9B%E5%95%861872
 */

import to from 'await-to-js';
import * as dayjs from 'dayjs';
import { createConnection } from 'mysql2/promise';
import { delay, findMissingItems, log } from 'src/utils';
import { connectionOptions } from 'src/utils/db';
import dingdingBot from 'src/utils/dingdingBot';
import { getRoomData } from './apis';
import { INestApplication } from '@nestjs/common';
import { NewFlatsService } from 'src/new-flats/new-flats.service';

/**
 * 采集新房数据
 * @param buildingid 建筑id
 * @returns
 */
const getRoomDataTaks = async (info: any, app: INestApplication) => {
  const { buildingid } = info;

  // 创建 NewFlatsService 实例
  const newFlatsService = app.get(NewFlatsService);

  // create the connection to database
  const connection = await createConnection(connectionOptions);
  const datalist: any[] = await getRoomData(info);
  const hasUtils = datalist?.length > 1;
  let list: any[] = [];
  datalist.forEach(({ rooms }) => {
    list = list.concat(rooms);
  });

  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const sql = `SELECT * FROM  new_flats_record WHERE buildingid = ? AND create_time = ?`;
  const [err2, yesterdayRes] = await to(
    connection.execute<any[]>(sql, [buildingid, yesterday]),
  );
  const yesterdata = yesterdayRes?.[0]?.[0];
  if (err2) {
    log(`查询失败了！！！`);
    log(err2);
  }
  const qifang = list.filter(
    (item) =>
      ['期房', '现房'].includes(item.roomstatus) && item.use === '成套住宅',
  );
  const qifang_num = qifang.length;
  const qifangList = qifang.map(({ flr, rn, unitnumber }) => {
    return hasUtils ? `${unitnumber}-${flr}-${rn}` : `${flr}-${rn}`;
  });
  const item = {
    buildingid,
    qifang_num,
    qifang_list: qifangList.join(','),
    dealed_list: yesterdata
      ? findMissingItems(yesterdata.qifang_list.split(','), qifangList).join(
          ',',
        )
      : null,
    wangqian_num: list.filter((item) => item.roomstatus === '网签').length,
    rengou_num: list.filter((item) => item.roomstatus === '认购').length,
    community: info.community,
    dealed: yesterdata ? yesterdata.qifang_num - qifang_num : 0,
    create_time: dayjs().format('YYYY-MM-DD'),
  };
  const [err3] = await to(
    connection.query(`insert into new_flats_record set ?`, item),
  );

  // 如果期房数量等于0，则将该楼盘设为已售罄
  if (qifang_num === 0) {
    // const sql = `UPDATE new_flats SET status = 1, , update_time = CURRENT_TIMESTAMP WHERE buildingid = ?;`;
    await newFlatsService.update({ buildingid }, { status: 1 });
    // await connection.query(sql, [buildingid]);
    const msg = `💥 ${info.community}：${info.name}楼盘已售罄`;
    log(msg);
    dingdingBot.pushMsg(
      msg +
        ` https://www.cq315house.com/HtmlPage/ShowRooms.html?buildingid=${buildingid}`,
    );
  }

  if (err3) {
    log('插入数据失败~');
    console.log(err3);
    return;
  }
  log(`🏫 新房数据爬取成功~ ${info.community}：${info.name}`);
  await connection.end();
};

/**
 * 根据当日采集的楼盘数据，计算出小区的数据
 */
const getCommunity = async (community: any) => {
  // create the connection to database
  const connection = await createConnection(connectionOptions);

  const sql =
    'SELECT community, SUM(qifang_num) as qifang_num, SUM(wangqian_num) as wangqian_num, SUM(rengou_num) as rengou_num, SUM(dealed) as dealed FROM new_flats_record WHERE community = ? AND create_time = ? GROUP BY community';
  const [err, res] = await to(
    connection.execute<any[]>(sql, [community, dayjs().format('YYYY-MM-DD')]),
  );
  if (err) {
    log(`查询失败了！！！`);
    log(err);
    return;
  }
  const data = res?.[0][0];
  if (data) {
    data.create_time = dayjs().format('YYYY-MM-DD');
    const [err3] = await to(
      connection.query(`insert into new_flats_record set ?`, data),
    );
    if (err3) {
      log('插入数据失败~');
      log(err3);
    }
  }
  log(`🏡 新房数据统计完成~ ${community}`);
  await connection.end();
};

/**
 * 重庆网上房地产新房任务
 */
export const cqHouseTaks = async (app: INestApplication) => {
  // create the connection to database
  const connection = await createConnection(connectionOptions);

  const sql = `SELECT name,buildingid,community FROM new_flats WHERE (status != 1 or status is null)`;
  const [err, newFlatsRes] = await to(connection.execute<any[]>(sql));
  if (err) {
    log(`查询失败了！！！`);
    log(err);
    return;
  }
  const list = newFlatsRes?.[0] || [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    await getRoomDataTaks(item, app);
    await delay();
  }

  const communityList = [...new Set(list.map((item) => item.community))];
  for (let i = 0; i < communityList.length; i++) {
    const item = communityList[i];
    await getCommunity(item);
    await delay();
  }
  log(`🎉🎉🎉[重庆网上房地产]楼栋数据结束抓取~`);
};

export default cqHouseTaks;
