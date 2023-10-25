import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewFlatsRecordService } from './new-flats-record.service';
import { CreateNewFlatsRecordDto } from './dto/create-new-flats-record.dto';
import { UpdateNewFlatsRecordDto } from './dto/update-new-flats-record.dto';

@Controller('new-flats-record')
export class NewFlatsRecordController {
  constructor(private readonly newFlatsRecordService: NewFlatsRecordService) {}

  @Post()
  create(@Body() createNewFlatsRecordDto: CreateNewFlatsRecordDto) {
    return this.newFlatsRecordService.create(createNewFlatsRecordDto);
  }

  @Get()
  findAll() {
    return this.newFlatsRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newFlatsRecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewFlatsRecordDto: UpdateNewFlatsRecordDto,
  ) {
    return this.newFlatsRecordService.update(+id, updateNewFlatsRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newFlatsRecordService.remove(+id);
  }
}
