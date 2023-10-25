import { PartialType } from '@nestjs/mapped-types';
import { CreateNewFlatDto } from './create-new-flat.dto';

export class UpdateNewFlatDto extends PartialType(CreateNewFlatDto) {}
