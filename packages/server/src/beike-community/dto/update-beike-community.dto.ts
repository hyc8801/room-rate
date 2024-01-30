import { PartialType } from '@nestjs/mapped-types';
import { CreateBeikeCommunityDto } from './create-beike-community.dto';

export class UpdateBeikeCommunityDto extends PartialType(CreateBeikeCommunityDto) {}
