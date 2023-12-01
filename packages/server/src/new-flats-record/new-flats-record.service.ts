import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNewFlatsRecordDto } from './dto/create-new-flats-record.dto';
import { UpdateNewFlatsRecordDto } from './dto/update-new-flats-record.dto';
import { NewFlatsRecordEntity } from './entities/new-flats-record.entity';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} newFlatsRecord`;
  }

  update(id: number, updateNewFlatsRecordDto: UpdateNewFlatsRecordDto) {
    return `This action updates a #${id} newFlatsRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} newFlatsRecord`;
  }
}
