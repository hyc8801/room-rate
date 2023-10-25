import { PartialType } from '@nestjs/mapped-types';
import { CreateNewFlatsRecordDto } from './create-new-flats-record.dto';

export class UpdateNewFlatsRecordDto extends PartialType(CreateNewFlatsRecordDto) {}
