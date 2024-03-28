import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedDocumentsController } from './authorized-documents.controller';

describe('AuthorizedDocumentsController', () => {
  let controller: AuthorizedDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizedDocumentsController],
    }).compile();

    controller = module.get<AuthorizedDocumentsController>(AuthorizedDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
