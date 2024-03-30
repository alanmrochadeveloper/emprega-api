import { Test, TestingModule } from '@nestjs/testing';
import { AdminDocumentsService } from './admin-documents.service';

describe('AdminDocumentsService', () => {
  let service: AdminDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDocumentsService],
    }).compile();

    service = module.get<AdminDocumentsService>(AdminDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
