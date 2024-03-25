import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>) {

    }

    async findByCNPJ(cnpj: string) {
        if (!cnpj) return null;
        return await this.companyRepository.findOneBy({ cnpj })
    }

    async create(company: Partial<Company>) {
        const companyToBeStored = this.companyRepository.create(company)
        return await this.companyRepository.save(companyToBeStored)
    }
}
