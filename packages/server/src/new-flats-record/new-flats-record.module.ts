import { Module } from '@nestjs/common';
import { NewFlatsRecordService } from './new-flats-record.service';
import { NewFlatsRecordController } from './new-flats-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFlatsRecordEntity } from './entities/new-flats-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewFlatsRecordEntity])],
  controllers: [NewFlatsRecordController],
  providers: [NewFlatsRecordService],
})
export class NewFlatsRecordModule {}
