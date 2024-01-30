import { Module } from '@nestjs/common';
import { BeikeAreaService } from './beike-area.service';
import { BeikeAreaController } from './beike-area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeikeAreaEntity } from './entities/beike-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeikeAreaEntity])],
  controllers: [BeikeAreaController],
  providers: [BeikeAreaService],
})
export class BeikeAreaModule {}
