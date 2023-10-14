/**
 * 新房数据
 * https://www.cq315house.com/HtmlPage/serviceSeaList.html?projectname=%E6%8B%9B%E5%95%861872
 */

import to from 'await-to-js';
import axios from 'axios';
import * as dayjs from 'dayjs';
import * as https from 'https';
import { createConnection } from 'mysql2/promise';
import { delay, findMissingItems, log } from 'src/utils';
import { connectionOptions } from 'src/utils/db';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

/**
 * 采集新房数据
 * @param buildingid 建筑id
 * @returns
 */
const getRoomData = async (info: any) => {
  const { buildingid } = info;
  // create the connection to database
  const connection = await createConnection(connectionOptions);
  const [err, res] = await to(
    axios.post(
      `https://www.cq315house.com/WebService/WebFormService.aspx/GetRoomJson`,
      { buildingid },
      {
        httpsAgent: agent,
      },
    ),
  );
  if (err) {
    log(`采集失败！！！${buildingid}`);
    log(err);
    return;
  }
  const datalist: any[] = JSON.parse(res?.data.d);
  const hasUtils = datalist?.length > 0;
  let list: any[] = [];
  datalist.forEach(({ rooms }) => {
    list = list.concat(rooms);
  });
  // const list: any[] = JSON.parse(res?.data.d)?.[0].rooms;

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
    (item) => item.roomstatus === '期房' && item.use === '成套住宅',
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

  if (err3) {
    log('插入数据失败~');
    console.log(err3);
    return;
  }
  log(`🏫 新房数据爬取成功~ ${info.community}：${info.name}`);
  await connection.end();
};

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
  log(`🏡 新房数据爬取成功~ ${community}`);
  await connection.end();
};

/**
 * 重庆网上房地产新房任务
 */
export const cqHouseTaks = async () => {
  // create the connection to database
  const connection = await createConnection(connectionOptions);

  const sql = `SELECT name,buildingid,community FROM new_flats`;
  const [err, newFlatsRes] = await to(connection.execute<any[]>(sql));
  if (err) {
    log(`查询失败了！！！`);
    log(err);
    return;
  }
  const list = newFlatsRes?.[0] || [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    await getRoomData(item);
    await delay();
  }

  const communityList = [...new Set(list.map((item) => item.community))];
  for (let i = 0; i < communityList.length; i++) {
    const item = communityList[i];
    await getCommunity(item);
    await delay();
  }
};

export default cqHouseTaks;
