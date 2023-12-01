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
  create(createNewFlatDto: CreateNewFlatDto) {
    console.log(`😋🙃 ~ file::`, createNewFlatDto);
    return 'This action adds a new newFlat';
  }

  async findAll() {
    return this.newFlatsRepository.find();
  }

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
