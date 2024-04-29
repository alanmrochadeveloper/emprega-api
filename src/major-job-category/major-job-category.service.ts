import { Injectable } from '@nestjs/common';
import { CreateMajorJobCategoryDto } from './dto/create-major-job-category.dto';
import { UpdateMajorJobCategoryDto } from './dto/update-major-job-category.dto';

@Injectable()
export class MajorJobCategoryService {
  create(createMajorJobCategoryDto: CreateMajorJobCategoryDto) {
    return 'This action adds a new majorJobCategory';
  }

  findAll() {
    return `This action returns all majorJobCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} majorJobCategory`;
  }

  update(id: number, updateMajorJobCategoryDto: UpdateMajorJobCategoryDto) {
    return `This action updates a #${id} majorJobCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} majorJobCategory`;
  }
}
