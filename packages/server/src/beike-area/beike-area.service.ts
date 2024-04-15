import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SECOND_HOUSE_KEY, AREA_LIST } from '@room-rate/common';
import { BeikeAreaEntity } from './entities/beike-area.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BeikeAreaService {
  constructor(
    @InjectRepository(BeikeAreaEntity)
    private beikeAreaRepository: Repository<BeikeAreaEntity>,
  ) {}

  insert(data: BeikeAreaEntity | BeikeAreaEntity[]) {
    return this.beikeAreaRepository.insert(data);
  }

  async getAll() {
    const list = await this.beikeAreaRepository.find();
    const districtData: any = {};
    SECOND_HOUSE_KEY.map((key) => {
      districtData[key] = AREA_LIST.map(({ name }) => {
        const districtList = list.filter((row) => name === row.district_name);
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
