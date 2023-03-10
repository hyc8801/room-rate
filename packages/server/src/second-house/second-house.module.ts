import { Module } from '@nestjs/common';
import { SecondHouseService } from './second-house.service';
import { SecondHouseController } from './second-house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecondHouseEntity } from './entities/second-house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecondHouseEntity])],
  providers: [SecondHouseService],
  controllers: [SecondHouseController],
  exports: [TypeOrmModule],
})
export class SecondHouseModule {}
