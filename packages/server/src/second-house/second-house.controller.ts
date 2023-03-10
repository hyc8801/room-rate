import { Controller, Get } from '@nestjs/common';
import { SecondHouseService } from './second-house.service';

@Controller('second-house')
export class SecondHouseController {
  constructor(private readonly secondHouseService: SecondHouseService) {}
  @Get()
  async getAll() {
    return await this.secondHouseService.getAll();
  }
}
