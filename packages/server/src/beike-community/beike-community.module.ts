import { Module } from '@nestjs/common';
import { BeikeCommunityService } from './beike-community.service';
import { BeikeCommunityController } from './beike-community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeikeCommunityEntity } from './entities/beike-community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeikeCommunityEntity])],
  controllers: [BeikeCommunityController],
  providers: [BeikeCommunityService],
})
export class BeikeCommunityModule {}
