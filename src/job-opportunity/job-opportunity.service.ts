import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { CreateJobOpportunityDto } from './dto/create';
import { JobOpportunity } from './jobOpportunity.entity';

@Injectable()
export class JobOpportunityService {
    constructor(
        @InjectRepository(JobOpportunity)
        private readonly jobOpportunityRepository: Repository<JobOpportunity>,
        private readonly companyService: CompanyService
    ) { }
    async create(payload: Partial<CreateJobOpportunityDto>) {
        const { companyId } = payload;
        const company = await this.companyService.findOneById(companyId);
        if (!company) throw new NotFoundException(`Empresa não encontrada!`)
        const jobOpportunity = this.jobOpportunityRepository.create(payload)
        jobOpportunity.company = company;
        return await this.jobOpportunityRepository.save(jobOpportunity);
    }

    async findAll({ page, limit, route }) {
        const [results, total] = await this.jobOpportunityRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data: results,
            count: total,
            currentPage: page,
            nextPage: total / limit > page ? `${route}?page=${page + 1}&limit=${limit}` : null,
            prevPage: page > 1 ? `${route}?page=${page - 1}&limit=${limit}` : null,
        };
    }
}
