import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CqBuildingRecordService } from './cq-building-record.service';
import { CreateCqBuildingRecordDto } from './dto/create-cq-building-record.dto';
import { CqBuildingRecordEntity } from './entities/cq-building-record.entity';

@Controller('new-flats-record')
export class CqBuildingRecordController {
  constructor(
    private readonly cqBuildingRecordService: CqBuildingRecordService,
  ) {}

  @Post()
  create(@Body() createNewFlatsRecordDto: CreateCqBuildingRecordDto) {
    return this.cqBuildingRecordService.create(createNewFlatsRecordDto);
  }

  @Get()
  findAll(@Query('type') type: keyof CqBuildingRecordEntity) {
    return this.cqBuildingRecordService.findAll(type);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cqBuildingRecordService.remove(+id);
  }
}
