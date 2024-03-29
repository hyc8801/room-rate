import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCqBuildingRecordDto } from './dto/create-cq-building-record.dto';
import { UpdateCqBuildingRecordDto } from './dto/update-cq-building-record.dto';
import { CqBuildingRecordEntity } from './entities/cq-building-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CqBuildingService } from 'src/cq-building/cq-building.service';
import * as dayjs from 'dayjs';

@Injectable()
export class CqBuildingRecordService {
  constructor(
    @InjectRepository(CqBuildingRecordEntity)
    private cqBuildingRecordRepository: Repository<CqBuildingRecordEntity>,
    @Inject(forwardRef(() => CqBuildingService))
    private cqBuildingService: CqBuildingService,
  ) {}

  create(createNewFlatsRecordDto: CreateCqBuildingRecordDto) {
    return 'This action adds a new newFlatsRecord';
  }

  insert(createNewFlatDto: CreateCqBuildingRecordDto) {
    return this.cqBuildingRecordRepository.insert(createNewFlatDto);
  }

  async findAll(type: keyof CqBuildingRecordEntity = 'dealed') {
    const queryBuilder = this.cqBuildingRecordRepository.createQueryBuilder();
    queryBuilder.where('buildingid IS NULL');
    const results = await queryBuilder.getMany();
    const communityList = await this.cqBuildingService.findAllCommunity();
    return communityList.map((name) => {
      return {
        name,
        type: 'line',
        data: results
          .filter((item) => item.community === name)
          .map((i) => {
            return [dayjs(i.create_time).startOf('day').valueOf(), i[type]];
          }),
      };
    });
    // return results;
  }

  async findOne(options: FindOptionsWhere<CqBuildingRecordEntity>) {
    return this.cqBuildingRecordRepository.findOneBy(options);
  }

  async findOneByBuilding(buildingid: string, createTime: Date | string) {
    const record = await this.cqBuildingRecordRepository
      .createQueryBuilder()
      .where(`DATE(create_time) = :createTime`, { createTime })
      .andWhere(`buildingid = :buildingid`, { buildingid })
      .getOne();

    return record;
  }

  /** 查询小于今天的最近一条数据 */
  async findLatestRecord(buildingid: string) {
    // 获取今天的日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 构建查询条件
    const record = await this.cqBuildingRecordRepository
      .createQueryBuilder()
      .where('buildingid = :buildingid', { buildingid })
      .andWhere('create_time < :today', { today })
      .orderBy('create_time', 'DESC')
      .take(1)
      .getOne();

    return record;
  }

  update(
    criteria: FindOptionsWhere<CqBuildingRecordEntity>,
    updateNewFlatsRecordDto: CqBuildingRecordEntity,
  ) {
    return this.cqBuildingRecordRepository.update(
      criteria,
      updateNewFlatsRecordDto,
    );
  }

  /** 根据小区名称和时间查询总数 */
  async getSumByCommunityAndDate(community: string, date: string) {
    // 'SELECT community, SUM(qifang_num) as qifang_num, SUM(wangqian_num) as wangqian_num, SUM(rengou_num) as rengou_num, SUM(dealed) as dealed FROM new_flats_record WHERE community = ? AND create_time = ? GROUP BY community'
    const result = await this.cqBuildingRecordRepository
      .createQueryBuilder()
      .select('community')
      .addSelect('SUM(qifang_num)', 'qifang_num')
      .addSelect('SUM(wangqian_num)', 'wangqian_num')
      .addSelect('SUM(rengou_num)', 'rengou_num')
      .addSelect('SUM(dealed)', 'dealed')
      .where('community = :community', { community })
      .andWhere('DATE(create_time) = :createTime', { createTime: date })
      .andWhere('buildingid IS NOT NULL')
      .groupBy('community')
      .getRawOne();

    return result as CqBuildingRecordEntity;
  }

  remove(id: number) {
    return `This action removes a #${id} newFlatsRecord`;
  }
}
