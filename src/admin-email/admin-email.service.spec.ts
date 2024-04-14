import { Test, TestingModule } from '@nestjs/testing';
import { AdminEmailService } from './admin-email.service';

describe('AdminEmailService', () => {
  let service: AdminEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminEmailService],
    }).compile();

    service = module.get<AdminEmailService>(AdminEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
