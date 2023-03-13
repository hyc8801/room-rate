import { ValidationPipe } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './utils';
import beikeTask from './tasks/beike';
import getCommunity from './tasks/beike/community';

log('🚀 启动任务~');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3200);
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
