import { Module } from '@nestjs/common';
import { MajorJobCategoryService } from './major-job-category.service';
import { MajorJobCategoryController } from './major-job-category.controller';

@Module({
  controllers: [MajorJobCategoryController],
  providers: [MajorJobCategoryService],
})
export class MajorJobCategoryModule {}
