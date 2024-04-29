import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MajorJobCategoryService } from './major-job-category.service';
import { CreateMajorJobCategoryDto } from './dto/create-major-job-category.dto';
import { UpdateMajorJobCategoryDto } from './dto/update-major-job-category.dto';

@Controller('major-job-category')
export class MajorJobCategoryController {
  constructor(private readonly majorJobCategoryService: MajorJobCategoryService) {}

  @Post()
  create(@Body() createMajorJobCategoryDto: CreateMajorJobCategoryDto) {
    return this.majorJobCategoryService.create(createMajorJobCategoryDto);
  }

  @Get()
  findAll() {
    return this.majorJobCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorJobCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMajorJobCategoryDto: UpdateMajorJobCategoryDto) {
    return this.majorJobCategoryService.update(+id, updateMajorJobCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.majorJobCategoryService.remove(+id);
  }
}
