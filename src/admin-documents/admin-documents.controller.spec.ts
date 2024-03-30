import { Test, TestingModule } from '@nestjs/testing';
import { AdminDocumentsController } from './admin-documents.controller';

describe('AdminDocumentsController', () => {
  let controller: AdminDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDocumentsController],
    }).compile();

    controller = module.get<AdminDocumentsController>(AdminDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
