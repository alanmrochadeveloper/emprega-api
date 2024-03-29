import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizedDocuments, AuthorizedDocumentsStatus } from './authorized-documents.entity';

@Injectable()
export class AuthorizedDocumentsService {
    constructor(
        @InjectRepository(AuthorizedDocuments)
        private authorizedDocumentRepository: Repository<AuthorizedDocuments>,
    ) { }

    async findOneByCompanyIdAndDocument(companyId: string, document: string): Promise<AuthorizedDocuments> {
        return await this.authorizedDocumentRepository.findOne({ where: { company: { id: companyId }, document }, relations: ['company'] })
    }

    async create(data: Partial<AuthorizedDocuments>): Promise<AuthorizedDocuments> {
        const authorizedDocument = this.authorizedDocumentRepository.create({
            company: data.company,
            document: data.document,
            status: AuthorizedDocumentsStatus.PENDING
        });
        return await this.authorizedDocumentRepository.save(authorizedDocument)
    }
}
