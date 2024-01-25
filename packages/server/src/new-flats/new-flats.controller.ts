import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewFlatsService } from './new-flats.service';
import { CreateNewFlatDto } from './dto/create-new-flat.dto';
import { UpdateNewFlatDto } from './dto/update-new-flat.dto';

@Controller('new-flats')
export class NewFlatsController {
  constructor(private readonly newFlatsService: NewFlatsService) {}

  @Post()
  create(@Body() createNewFlatDto: CreateNewFlatDto) {
    // return this.newFlatsService.create(createNewFlatDto);
  }

  @Get()
  findAll() {
    return this.newFlatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newFlatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewFlatDto: UpdateNewFlatDto) {
    return this.newFlatsService.update(+id, updateNewFlatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newFlatsService.remove(+id);
  }
}
