import { Module } from '@nestjs/common';
import { NewFlatsRecordService } from './new-flats-record.service';
import { NewFlatsRecordController } from './new-flats-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFlatsRecordEntity } from './entities/new-flats-record.entity';
import { NewFlatsService } from 'src/new-flats/new-flats.service';
import { NewFlatsEntity } from 'src/new-flats/entities/new-flats.entitys';

@Module({
  imports: [TypeOrmModule.forFeature([NewFlatsRecordEntity, NewFlatsEntity])],
  controllers: [NewFlatsRecordController],
  providers: [NewFlatsRecordService, NewFlatsService],
})
export class NewFlatsRecordModule {}
