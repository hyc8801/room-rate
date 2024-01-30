import { Controller, Get } from '@nestjs/common';
import { BeikeAreaService } from './beike-area.service';

@Controller('beike-area')
export class BeikeAreaController {
  constructor(private readonly beikeAreaService: BeikeAreaService) {}
  @Get()
  async getAll() {
    return await this.beikeAreaService.getAll();
  }
}
