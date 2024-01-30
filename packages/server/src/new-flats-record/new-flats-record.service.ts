import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNewFlatsRecordDto } from './dto/create-new-flats-record.dto';
import { UpdateNewFlatsRecordDto } from './dto/update-new-flats-record.dto';
import { NewFlatsRecordEntity } from './entities/new-flats-record.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewFlatsService } from 'src/new-flats/new-flats.service';

@Injectable()
export class NewFlatsRecordService {
  constructor(
    @InjectRepository(NewFlatsRecordEntity)
    private newFlatsRecordRepository: Repository<NewFlatsRecordEntity>,
    @Inject(forwardRef(() => NewFlatsService))
    private newFlatsService: NewFlatsService,
  ) {}
  create(createNewFlatsRecordDto: CreateNewFlatsRecordDto) {
    return 'This action adds a new newFlatsRecord';
  }

  insert(createNewFlatDto: CreateNewFlatsRecordDto) {
    return this.newFlatsRecordRepository.insert(createNewFlatDto);
  }

  async findAll(type: keyof NewFlatsRecordEntity = 'dealed') {
    const queryBuilder = this.newFlatsRecordRepository.createQueryBuilder();
    queryBuilder.where('buildingid IS NULL');
    const results = await queryBuilder.getMany();
    const communityList = await this.newFlatsService.findAllCommunity();
    return communityList.map((name) => {
      return {
        name,
        type: 'line',
        data: results
          .filter((item) => item.community === name)
          .map((i) => {
            return [new Date(i.create_time).getTime(), i[type]];
          }),
      };
    });
    // return results;
  }

  async findOne(options: FindOptionsWhere<NewFlatsRecordEntity>) {
    return this.newFlatsRecordRepository.findOneBy(options);
  }

  update(
    criteria: FindOptionsWhere<NewFlatsRecordEntity>,
    updateNewFlatsRecordDto: UpdateNewFlatsRecordDto,
  ) {
    return this.newFlatsRecordRepository.update(
      criteria,
      updateNewFlatsRecordDto,
    );
    // return `This action updates a #${id} newFlatsRecord`;
  }

  /** 根据小区名称和时间查询总数 */
  async getSumByCommunityAndDate(community: string, date: string) {
    // 'SELECT community, SUM(qifang_num) as qifang_num, SUM(wangqian_num) as wangqian_num, SUM(rengou_num) as rengou_num, SUM(dealed) as dealed FROM new_flats_record WHERE community = ? AND create_time = ? GROUP BY community'
    const result = await this.newFlatsRecordRepository
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

    return result as NewFlatsRecordEntity;
  }

  remove(id: number) {
    return `This action removes a #${id} newFlatsRecord`;
  }
}
