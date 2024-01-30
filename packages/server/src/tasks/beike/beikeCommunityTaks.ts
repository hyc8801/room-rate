// f2 朝南、l3三室 c默认 c3最新发布
// https://m.ke.com/liverpool/api/ershoufang/getList?cityId=500000&condition=%252Fl3f2c3611099957604
// https://cq.ke.com/api/listtop?type=resblock&resblock_id=3611099957604&community_id=0&district_id=&bizcircle_id=&subway_station_id=&word=&source=ershou_xiaoqu
// 今天发布
import { COMMUNITY_LIST } from '@room-rate/common';
import { delay, log } from '../../utils';
import { INestApplication } from '@nestjs/common';
import { BeikeCommunityService } from 'src/beike-community/beike-community.service';
import { getBeikeCommunityData } from './apis';

// https://cq.ke.com/ershoufang/co32f2l3c3611099957604/?sug=%E4%B8%9C%E5%8E%9FD7%E4%B8%80%E6%9C%9F

/**
 * 贝壳小区数据（朝南三室）爬取
 */
export const beikeCommunityTaks = async (app: INestApplication) => {
  // 创建 beikeCommunityService 实例
  const beikeCommunityService = app.get(BeikeCommunityService);
  for (let q = 0; q < COMMUNITY_LIST.length; q++) {
    const item = COMMUNITY_LIST[q];
    const data = await getBeikeCommunityData(item);
    beikeCommunityService.insert(data);

    log(`[贝壳]小区数据爬取成功~ ${data.name}`);
    await delay(1000);
  }
  log(`🎉🎉🎉[贝壳]小区数据结束抓取~`);
};

export default beikeCommunityTaks;
