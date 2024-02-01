import { AREA_LIST } from '@room-rate/common';
import { log } from '../../utils';
import { getDataByErshou } from './apis';
import { INestApplication } from '@nestjs/common';
import { BeikeAreaService } from 'src/beike-area/beike-area.service';

/**
 * 贝壳二手房数据爬取
 * @returns
 */
export const beikeAreaTaks = async (app: INestApplication) => {
  // 创建 beikeAreaService 实例
  const beikeAreaService = app.get(BeikeAreaService);

  for (let index = 0; index < AREA_LIST.length; index++) {
    const item = AREA_LIST[index];
    const supply = await getDataByErshou(
      item.id,
      item.name,
      item.district_pinyin,
    );

    await beikeAreaService.insert(supply);

    log(`[贝壳]抓取区域抓取成功~ ${item.name}`);
  }
  log(`🎉🎉🎉[贝壳]区域数据结束抓取~`);
};

export default beikeAreaTaks;
