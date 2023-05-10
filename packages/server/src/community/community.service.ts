import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { COMMUNITY_KEY, COMMUNITY_LIST } from '@room-rate/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}
  create(createCommunityDto: CreateCommunityDto) {
    console.log(createCommunityDto);
    return 'This action adds a new community';
  }

  async findAll() {
    const list = await this.communityRepository.find();
    const districtData: any = {};
    COMMUNITY_KEY.map((key) => {
      districtData[key] = COMMUNITY_LIST.map(({ name }) => {
        const districtList = list.filter((row) => name === row.name);
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

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    console.log(updateCommunityDto);
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
