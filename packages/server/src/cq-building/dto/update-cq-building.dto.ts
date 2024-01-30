import { PartialType } from '@nestjs/mapped-types';
import { CreateCqBuildingDto } from './create-cq-building.dto';

export class UpdateCqBuildingDto extends PartialType(CreateCqBuildingDto) {}
