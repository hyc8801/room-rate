import { Controller, Get } from '@nestjs/common';
import { BeikeCommunityService } from './beike-community.service';

@Controller('beike-community')
export class BeikeCommunityController {
  constructor(private readonly beikeCommunityService: BeikeCommunityService) {}

  // @Post()
  // create() {
  //   // return this.beikeCommunityService.create(createCommunityDto);
  // }

  @Get()
  findAll() {
    return this.beikeCommunityService.findAll();
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCommunityDto: UpdateCommunityDto,
  // ) {
  //   // return this.beikeCommunityService.update(+id, updateCommunityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.beikeCommunityService.remove(+id);
  // }
}
