import { Test, TestingModule } from '@nestjs/testing';
import { MajorJobCategoryService } from './major-job-category.service';

describe('MajorJobCategoryService', () => {
  let service: MajorJobCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MajorJobCategoryService],
    }).compile();

    service = module.get<MajorJobCategoryService>(MajorJobCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
