// 搜索楼盘

import { INestApplication } from '@nestjs/common';
import { NewFlatsService } from 'src/new-flats/new-flats.service';
import { delay, getConfig, log } from 'src/utils';
import { getProjectList, getRoomData } from './apis';
import dingdingBot from 'src/utils/dingdingBot';
import { findMaxFlr, getTotal } from './utils';

/** 搜索小区项目任务 */
export const searchProjectTaks = async (app: INestApplication) => {
  // 创建 NewFlatsService 实例
  const newFlatsService = app.get(NewFlatsService);
  const { projectList } = await getConfig();

  const dbList = await newFlatsService.getAllBuildingIds();
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
      const row = {
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
      await newFlatsService.insert(row);
      const msg = `【${projectList[i]}】 新增楼栋：${row.name}`;
      dingdingBot.pushMsg(msg);
      log(msg);
    }
  }
  log(`🎉🎉🎉[重庆网上房地产]小区数据结束抓取~`);
};
