import { Injectable } from '@nestjs/common';
import { UpdateCqBuildingDto } from './dto/update-cq-building.dto';
import { CqBuildingEntity } from './entities/cq-building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class CqBuildingService {
  constructor(
    @InjectRepository(CqBuildingEntity)
    private cqBuildingRepository: Repository<CqBuildingEntity>,
  ) {}

  insert(info: CqBuildingEntity) {
    return this.cqBuildingRepository.insert(info);
  }

  async findAll() {
    return this.cqBuildingRepository.find();
  }

  /** 查询所有的buildingid，返回数组 */
  async getAllBuildingIds() {
    const list = await this.cqBuildingRepository.find({
      select: ['buildingid'],
    });
    return list.map(({ buildingid }) => buildingid);
  }

  /** 查询所有的小区名称，已去重 */
  async findAllCommunity() {
    // SELECT DISTINCT community FROM new_flats;
    const queryBuilder = this.cqBuildingRepository.createQueryBuilder();
    queryBuilder.select('DISTINCT community');
    const distinctData = await queryBuilder.getRawMany();
    return distinctData.map((item) => item.community);
  }

  /**
   * 查询所有状态未销售完的小区
   */
  async getFlatsWithoutStatus1(): Promise<CqBuildingEntity[]> {
    // `SELECT name,buildingid,community FROM new_flats WHERE (status != 1 or status is null)`
    const flats = await this.cqBuildingRepository.find({
      where: [{ status: Not(1) }, { status: IsNull() }],
      select: ['name', 'buildingid', 'community'],
    });
    return flats;
  }

  findOne(id: number) {
    return `This action returns a #${id} newFlat`;
  }

  update(
    criteria: FindOptionsWhere<CqBuildingEntity>,
    updateNewFlatDto: UpdateCqBuildingDto,
  ) {
    return this.cqBuildingRepository.update(criteria, updateNewFlatDto);
  }

  remove(id: number) {
    return `This action removes a #${id} newFlat`;
  }
}
