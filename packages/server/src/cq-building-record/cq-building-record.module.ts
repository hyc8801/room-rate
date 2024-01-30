import { Module } from '@nestjs/common';
import { CqBuildingRecordService } from './cq-building-record.service';
import { CqBuildingRecordController } from './cq-building-record.controller';
import { CqBuildingService } from 'src/cq-building/cq-building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqBuildingEntity } from 'src/cq-building/entities/cq-building.entity';
import { CqBuildingRecordEntity } from './entities/cq-building-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CqBuildingEntity, CqBuildingRecordEntity]),
  ],
  controllers: [CqBuildingRecordController],
  providers: [CqBuildingRecordService, CqBuildingService],
})
export class CqBuildingRecordModule {}
