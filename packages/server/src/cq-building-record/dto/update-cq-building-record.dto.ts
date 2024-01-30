import { PartialType } from '@nestjs/mapped-types';
import { CreateCqBuildingRecordDto } from './create-cq-building-record.dto';

export class UpdateCqBuildingRecordDto extends PartialType(CreateCqBuildingRecordDto) {}
