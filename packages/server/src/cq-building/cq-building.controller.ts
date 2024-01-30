import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CqBuildingService } from './cq-building.service';

@Controller('cq-building')
export class CqBuildingController {
  constructor(private readonly cqBuildingService: CqBuildingService) {}

  @Get()
  findAll() {
    return this.cqBuildingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cqBuildingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cqBuildingService.remove(+id);
  }
}
