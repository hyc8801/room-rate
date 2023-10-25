import { Injectable } from '@nestjs/common';
import { CreateNewFlatsRecordDto } from './dto/create-new-flats-record.dto';
import { UpdateNewFlatsRecordDto } from './dto/update-new-flats-record.dto';
import { NewFlatsRecordEntity } from './entities/new-flats-record.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewFlatsRecordService {
  constructor(
    @InjectRepository(NewFlatsRecordEntity)
    private newFlatsRecordRepository: Repository<NewFlatsRecordEntity>,
  ) {}
  create(createNewFlatsRecordDto: CreateNewFlatsRecordDto) {
    return 'This action adds a new newFlatsRecord';
  }

  async findAll() {
    return await this.newFlatsRecordRepository.find();
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
