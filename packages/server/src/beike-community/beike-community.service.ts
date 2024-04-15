import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMUNITY_KEY, COMMUNITY_LIST } from '@room-rate/common';
import { Repository } from 'typeorm';
import { BeikeCommunityEntity } from './entities/beike-community.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BeikeCommunityService {
  constructor(
    @InjectRepository(BeikeCommunityEntity)
    private beikeCommunityRepository: Repository<BeikeCommunityEntity>,
  ) {}

  insert(data: BeikeCommunityEntity) {
    return this.beikeCommunityRepository.insert(data);
  }

  async findAll() {
    const list = await this.beikeCommunityRepository.find();
    const districtData: any = {};
    COMMUNITY_KEY.map((key) => {
      districtData[key] = COMMUNITY_LIST.map(({ name }) => {
        const districtList = list.filter((row) => name === row.name);
        return {
          name,
          type: 'line',
          data: districtList
            .filter((i: any) => i[key])
            .map((i: any) => [
              dayjs(i.create_time).startOf('day').valueOf(),
              i[key] || 0,
            ]),
        };
      });
    });
    return districtData;
  }
}
