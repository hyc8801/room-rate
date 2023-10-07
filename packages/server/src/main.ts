import { ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './utils';
import beikeTask from './tasks/beike';
import getCommunity from './tasks/beike/community';
import './config/env';

log('🚀 启动任务~');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PROT || 3200));
}
// 接口服务
bootstrap();

// 贝壳定时任务启动~每日9点
schedule.scheduleJob('0 0 9 * * 0-7', () => {
  log('贝壳数据开始抓取~');
  beikeTask();
});

// 贝壳小区定时任务启动~每日8点40
schedule.scheduleJob('0 40 8 * * 0-7', () => {
  log('贝壳数据开始抓取~');
  getCommunity();
});

// 临时一次性运行，用于服务崩溃后单独运行当日的采集任务
if (process.env.SINGLE === 'true') {
  const run = async () => {
    log('贝壳区县数据开始抓取~');
    // await beikeTask();

    log('贝壳小区数据开始抓取~');
    await getCommunity();
  };
  run();
}
