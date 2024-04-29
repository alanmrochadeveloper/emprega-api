import { PartialType } from '@nestjs/mapped-types';
import { CreateMajorJobCategoryDto } from './create-major-job-category.dto';

export class UpdateMajorJobCategoryDto extends PartialType(CreateMajorJobCategoryDto) {}
