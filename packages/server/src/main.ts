import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './utils';
import beikeTask from './tasks/beike';
import getCommunity from './tasks/beike/community';
import './config/env';
import cqHouseTaks from './tasks/cqHouse';
import { searchProjectTaks } from './tasks/cqHouse/searchProject';

log('🚀 启动任务~~');

const run = async (app: INestApplication) => {
  log('🚧[贝壳]区域数据开始抓取~  临时');
  await beikeTask();

  log('🚧[贝壳]小区数据开始抓取~ 临时');
  await getCommunity();

  log('🚧[重庆网上房地产]小区数据开始抓取~ 临时');
  await searchProjectTaks(app);

  log('🚧[重庆网上房地产]楼栋数据开始抓取~ 临时');
  await cqHouseTaks();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PROT || 3200));

  // 临时一次性运行，用于服务崩溃后单独运行当日的采集任务
  if (process.env.SINGLE === 'true') run(app);

  schedule.scheduleJob('0 0 9 * * 0-7', () => {
    log('✨[贝壳]区域数据开始抓取~');
    beikeTask();
  });

  schedule.scheduleJob('0 40 8 * * 0-7', () => {
    log('✨[贝壳]小区数据开始抓取~');
    getCommunity();
  });

  schedule.scheduleJob('0 0 8 * * 0-7', () => {
    log('✨[重庆网上房地产]小区数据开始抓取~');
    searchProjectTaks(app);
  });

  schedule.scheduleJob('0 20 8 * * 0-7', () => {
    log('✨[重庆网上房地产]楼栋数据开始抓取~');
    cqHouseTaks();
  });
}
// 接口服务
bootstrap();
