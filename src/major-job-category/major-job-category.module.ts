import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MajorJobCategory } from "./entities/major-job-category.entity";
import { MajorJobCategoryController } from "./major-job-category.controller";
import { MajorJobCategoryService } from "./major-job-category.service";

@Module({
  imports: [TypeOrmModule.forFeature([MajorJobCategory])],
  controllers: [MajorJobCategoryController],
  providers: [MajorJobCategoryService],
})
export class MajorJobCategoryModule {}
