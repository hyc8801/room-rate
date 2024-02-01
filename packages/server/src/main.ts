import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './utils';
import { beikeAreaTaks, beikeCommunityTaks } from './tasks/beike';
import { cqBuildingTaks, cqCommunityTaks } from './tasks/cqHouse';
import '../config/env';

const singleRun = async (app: INestApplication) => {
  log('🚧 [贝壳]区域数据开始抓取~  临时');
  await beikeAreaTaks(app);

  log('🚧 [贝壳]小区数据开始抓取~ 临时');
  await beikeCommunityTaks(app);

  log('🚧 [重庆网上房地产]小区数据开始抓取~ 临时');
  await cqCommunityTaks(app);

  log('🚧 [重庆网上房地产]楼栋数据开始抓取~ 临时');
  await cqBuildingTaks(app);
};

const scheduleRun = (app: INestApplication) => {
  schedule.scheduleJob('0 0 9 * * 0-7', () => {
    log('✨[贝壳]区域数据开始抓取~');
    beikeAreaTaks(app);
  });

  schedule.scheduleJob('0 40 8 * * 0-7', () => {
    log('✨[贝壳]小区数据开始抓取~');
    beikeCommunityTaks(app);
  });

  schedule.scheduleJob('0 0 8 * * 0-7', () => {
    log('✨[重庆网上房地产]小区数据开始抓取~');
    cqCommunityTaks(app);
  });

  schedule.scheduleJob('0 20 8 * * 0-7', () => {
    log('✨[重庆网上房地产]楼栋数据开始抓取~');
    cqBuildingTaks(app);
  });
};

async function bootstrap() {
  const PROT = process.env.PROT || 3200;
  log(`🚀 服务启动~~ 端口：${PROT}`);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(PROT));

  scheduleRun(app);
  // 临时一次性运行，用于服务崩溃后单独运行当日的采集任务
  if (process.env.SINGLE === 'true') singleRun(app);
}
// 接口服务
bootstrap();
