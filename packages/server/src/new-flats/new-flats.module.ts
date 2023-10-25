import { Module } from '@nestjs/common';
import { NewFlatsService } from './new-flats.service';
import { NewFlatsController } from './new-flats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFlatsEntity } from './entities/new-flats.entitys';

@Module({
  imports: [TypeOrmModule.forFeature([NewFlatsEntity])],
  controllers: [NewFlatsController],
  providers: [NewFlatsService],
})
export class NewFlatsModule {}
