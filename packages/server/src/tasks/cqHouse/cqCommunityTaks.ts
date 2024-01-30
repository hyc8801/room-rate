// 搜索楼盘

import { INestApplication } from '@nestjs/common';
import { delay, getConfig, log } from 'src/utils';
import { getProjectList, getRoomData } from './apis';
import dingdingBot from 'src/utils/dingdingBot';
import { findMaxFlr, getTotal } from './utils';
import { CqBuildingService } from 'src/cq-building/cq-building.service';
import { CqBuildingEntity } from 'src/cq-building/entities/cq-building.entity';

/** 搜索小区项目任务 */
export const cqCommunityTaks = async (app: INestApplication) => {
  // 创建 CqBuildingService 实例
  const cqBuildingService = app.get(CqBuildingService);
  const { projectList } = await getConfig();

  const dbList = await cqBuildingService.getAllBuildingIds();
  // 需要搜索的项目名称
  for (let i = 0; i < projectList.length; i++) {
    const projectname = projectList[i];
    // 搜索出来的数据列表
    const list = (await getProjectList(projectname)).filter((item) => {
      return !dbList.includes(item.buildingid);
    });
    await delay();
    for (let j = 0; j < list.length; j++) {
      const item = list[j];
      const dataList = await getRoomData(item);
      await delay();
      const { buildingid, blockname, projectid } = item;
      const row: CqBuildingEntity = {
        name: blockname,
        projectid,
        buildingid,
        projectname: item.projectname,
        total: getTotal(dataList),
        rn: dataList[0]?.maxX,
        unit: dataList.length,
        floor: findMaxFlr(dataList[0]?.rooms || []),
        community: projectname,
      };
      // 住宅为空
      if (!row.total) break;
      await cqBuildingService.insert(row);
      const msg = `【${projectList[i]}】 新增楼栋：${row.name}`;
      dingdingBot.pushMsg(msg);
      log(msg);
    }
  }
  log(`🎉🎉🎉[重庆网上房地产]小区数据结束抓取~`);
};
