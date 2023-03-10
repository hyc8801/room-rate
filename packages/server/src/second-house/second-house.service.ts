import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AREA_LIST, SECOND_HOUSE_KEY } from '@room-rate/common';
import { Repository } from 'typeorm';
import { SecondHouseEntity } from './entities/second-house.entity';

@Injectable()
export class SecondHouseService {
  constructor(
    @InjectRepository(SecondHouseEntity)
    private secondHouseRepository: Repository<SecondHouseEntity>,
  ) {}
  async getAll() {
    const list = await this.secondHouseRepository.find();
    const districtData: any = {};
    SECOND_HOUSE_KEY.map((key) => {
      districtData[key] = AREA_LIST.map(({ name }) => {
        const districtList = list.filter((row) => name === row.district_name);
        return {
          name,
          type: 'line',
          data: districtList.map((i: any) => [
            new Date(i.create_time).getTime(),
            i[key] || 0,
          ]),
        };
      });
    });
    return districtData;
  }
}
