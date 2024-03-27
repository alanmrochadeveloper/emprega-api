import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobOpportunity } from './jobOpportunity.entity';

@Injectable()
export class JobOpportunityService {
    constructor(
        @InjectRepository(JobOpportunity)
        private readonly jobOpportunityRepository: Repository<JobOpportunity>,
    ) { }
    async create(payload: Partial<JobOpportunity>) {
        const jobOpportunity = this.jobOpportunityRepository.create(payload)
        return await this.jobOpportunityRepository.save(jobOpportunity);
    }
}
