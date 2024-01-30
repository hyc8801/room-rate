import { PartialType } from '@nestjs/mapped-types';
import { CreateBeikeAreaDto } from './create-beike-area.dto';

export class UpdateBeikeAreaDto extends PartialType(CreateBeikeAreaDto) {}
