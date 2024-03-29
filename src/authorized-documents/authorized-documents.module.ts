import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizedDocumentsController } from './authorized-documents.controller';
import { AuthorizedDocuments } from './authorized-documents.entity';
import { AuthorizedDocumentsService } from './authorized-documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizedDocuments])],
  providers: [AuthorizedDocumentsService],
  controllers: [AuthorizedDocumentsController],
  exports: [AuthorizedDocumentsService]
})
export class AuthorizedDocumentsModule { }
