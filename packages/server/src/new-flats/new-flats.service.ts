import { Injectable } from '@nestjs/common';
import { CreateNewFlatDto } from './dto/create-new-flat.dto';
import { UpdateNewFlatDto } from './dto/update-new-flat.dto';
import { NewFlatsEntity } from './entities/new-flats.entitys';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewFlatsService {
  constructor(
    @InjectRepository(NewFlatsEntity)
    private newFlatsRepository: Repository<NewFlatsEntity>,
  ) {}
  insert(createNewFlatDto: CreateNewFlatDto) {
    return this.newFlatsRepository.insert(createNewFlatDto);
  }

  async findAll() {
    return this.newFlatsRepository.find();
  }

  /** 查询所有的buildingid，返回数组 */
  async getAllBuildingIds() {
    const list = await this.newFlatsRepository.find({ select: ['buildingid'] });
    return list.map(({ buildingid }) => buildingid);
  }

  /** 查询所有的小区名称，已去重 */
  async findAllCommunity() {
    // SELECT DISTINCT community FROM new_flats;
    const queryBuilder = this.newFlatsRepository.createQueryBuilder();
    queryBuilder.select('DISTINCT community');
    const distinctData = await queryBuilder.getRawMany();
    return distinctData.map((item) => item.community);
  }

  findOne(id: number) {
    return `This action returns a #${id} newFlat`;
  }

  update(id: number, updateNewFlatDto: UpdateNewFlatDto) {
    return `This action updates a #${id} newFlat`;
  }

  remove(id: number) {
    return `This action removes a #${id} newFlat`;
  }
}
