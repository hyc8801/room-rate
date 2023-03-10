// f2 朝南、l3三室 c默认 c3最新发布
// https://m.ke.com/liverpool/api/ershoufang/getList?cityId=500000&condition=%252Fl3f2c3611099957604
// https://cq.ke.com/api/listtop?type=resblock&resblock_id=3611099957604&community_id=0&district_id=&bizcircle_id=&subway_station_id=&word=&source=ershou_xiaoqu
// 今天发布
import { COMMUNITY_LIST } from '@room-rate/common';
import to from 'await-to-js';
import axios from 'axios';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import { createConnection } from 'mysql2/promise';
import { delay, log } from '../../utils';

// https://cq.ke.com/ershoufang/co32f2l3c3611099957604/?sug=%E4%B8%9C%E5%8E%9FD7%E4%B8%80%E6%9C%9F

/**
 * 贝壳小区数据（朝南三室）爬取
 */
const getCommunity = async () => {
  // create the connection to database
  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  for (let q = 0; q < COMMUNITY_LIST.length; q++) {
    const item = COMMUNITY_LIST[q];
    const [err, res] = await to(
      axios.get(`https://cq.ke.com/ershoufang/co32f2l3c${item.id}`),
    );
    if (err) {
      log('小区数据抓取失败~');
      log(err);
    }
    const $ = load(res?.data);
    const total_3room_south = $('.total span')?.text();
    let quoted = 0;
    const list = $('.sellListContent .followInfo');
    for (let i = 0; i < list.length; i++) {
      if (list?.eq(i)?.text()?.includes('今天发布')) {
        quoted++;
      }
    }
    const [err2, res2] = await to(
      axios.get(
        `https://cq.ke.com/api/listtop?type=resblock&resblock_id=${item.id}&community_id=0&district_id=&bizcircle_id=&subway_station_id=&word=&source=ershou_xiaoqu`,
      ),
    );
    if (err2) {
      log('小区数据2抓取失败~');
      log(err2);
    }
    const info2 = res2?.data?.data?.info || {};
    const data = {
      // 平局价格
      average_price: info2.unitPrice,
      // 小区总数
      total: info2.sellNum,
      // 90天成交数据
      dealed: info2['90saleCount'],
      // 30天带看数据
      showed: info2.day30See,
      // 小区名称
      name: item.name,
      // 三房朝南总数
      total_3room_south,
      // 新增挂牌数量
      quoted,
      // 创建日期
      create_time: dayjs().format('YYYY-MM-DD'),
    };
    const [err3, res3] = await to(
      connection.query(`insert into community set ?`, data),
    );
    if (err3) {
      log('插入数据失败~');
      console.log(err3);
      return;
    }
    log(`小区数据爬取成功~ ${data.name}`);
    await delay(1000);
  }
  connection.end();
};

export default getCommunity;
