/**
 * 新房数据
 * https://www.cq315house.com/HtmlPage/serviceSeaList.html?projectname=%E6%8B%9B%E5%95%861872
 */

import * as dayjs from 'dayjs';
import { delay, findMissingItems, log } from 'src/utils';
import dingdingBot from 'src/utils/dingdingBot';
import { getRoomData } from './apis';
import { INestApplication } from '@nestjs/common';
import { CqBuildingService } from 'src/cq-building/cq-building.service';
import { CqBuildingRecordService } from 'src/cq-building-record/cq-building-record.service';

/**
 * 采集新房数据
 * @param buildingid 建筑id
 * @returns
 */
const getRoomDataTaks = async (info: any, app: INestApplication) => {
  const { buildingid } = info;

  // 创建 CqBuildingService 实例
  const cqBuildingService = app.get(CqBuildingService);
  // 创建 cqBuildingRecordService 实例
  const cqBuildingRecordService = app.get(CqBuildingRecordService);

  const datalist: any[] = await getRoomData(info);
  const hasUtils = datalist?.length > 1;
  let list: any[] = [];
  datalist.forEach(({ rooms }) => (list = list.concat(rooms)));

  /** 查询小于今天的最近一条数据 */
  const yesterdata = await cqBuildingRecordService.findLatestRecord(buildingid);

  const qifang = list.filter(
    (item) =>
      ['期房', '现房'].includes(item.roomstatus) && item.use === '成套住宅',
  );
  const qifang_num = qifang.length;
  const qifangList = qifang.map(({ flr, rn, unitnumber }) =>
    hasUtils ? `${unitnumber}-${flr}-${rn}` : `${flr}-${rn}`,
  );
  const item = {
    buildingid,
    qifang_num,
    qifang_list: qifangList.join(','),
    dealed_list: yesterdata
      ? findMissingItems(yesterdata.qifang_list?.split(','), qifangList).join(
          ',',
        )
      : null,
    wangqian_num: list.filter((item) => item.roomstatus === '网签').length,
    rengou_num: list.filter((item) => item.roomstatus === '认购').length,
    community: info.community,
    dealed: yesterdata ? yesterdata.qifang_num - qifang_num : 0,
    // create_time: dayjs().toDate(),
  };
  await cqBuildingRecordService.insert(item);

  // 如果期房数量等于0，则将该楼盘设为已售罄
  if (qifang_num === 0) {
    await cqBuildingService.update({ buildingid }, { status: 1 });
    const msg = `💥 ${info.community}：${info.name}楼盘已售罄`;
    log(msg);
    dingdingBot.pushMsg(
      msg +
        ` https://www.cq315house.com/HtmlPage/ShowRooms.html?buildingid=${buildingid}`,
    );
  }

  log(`🏫 [重庆网上房地产]楼栋数据爬取成功~ ${info.community}：${info.name}`);
};

/**
 * 新房！
 * 根据当日采集的楼盘数据，计算出小区的数据
 */
export const cqCommunityTaks = async (
  community: any,
  app: INestApplication,
) => {
  // 创建 cqBuildingRecordService 实例
  const cqBuildingRecordService = app.get(CqBuildingRecordService);

  const communitySum = await cqBuildingRecordService.getSumByCommunityAndDate(
    community,
    dayjs().format('YYYY-MM-DD'),
  );
  cqBuildingRecordService.insert(communitySum);
  log(`🏡 [重庆网上房地产]新房数据统计完成~ ${community}`);
};

/**
 * 重庆网上房地产新房任务
 */
export const cqBuildingTaks = async (app: INestApplication) => {
  // 创建 CqBuildingService 实例
  const cqBuildingService = app.get(CqBuildingService);
  const list = await cqBuildingService.getFlatsWithoutStatus1();

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    await getRoomDataTaks(item, app);
    await delay();
  }

  const communityList = [...new Set(list.map((item) => item.community))];
  for (let i = 0; i < communityList.length; i++) {
    const item = communityList[i];
    await cqCommunityTaks(item, app);
    await delay();
  }
  log(`🎉🎉🎉[重庆网上房地产]楼栋数据结束抓取~`);
};

export default cqBuildingTaks;
