import { Test, TestingModule } from '@nestjs/testing';
import { MajorJobCategoryController } from './major-job-category.controller';
import { MajorJobCategoryService } from './major-job-category.service';

describe('MajorJobCategoryController', () => {
  let controller: MajorJobCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MajorJobCategoryController],
      providers: [MajorJobCategoryService],
    }).compile();

    controller = module.get<MajorJobCategoryController>(MajorJobCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
