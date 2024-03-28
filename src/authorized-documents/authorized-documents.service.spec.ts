import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedDocumentsService } from './authorized-documents.service';

describe('AuthorizedDocumentsService', () => {
  let service: AuthorizedDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizedDocumentsService],
    }).compile();

    service = module.get<AuthorizedDocumentsService>(AuthorizedDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
