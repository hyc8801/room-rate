import { Module } from '@nestjs/common';
import { CqBuildingService } from './cq-building.service';
import { CqBuildingController } from './cq-building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqBuildingEntity } from './entities/cq-building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CqBuildingEntity])],
  controllers: [CqBuildingController],
  providers: [CqBuildingService],
})
export class CqBuildingModule {}
