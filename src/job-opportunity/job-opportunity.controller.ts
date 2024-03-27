import { Body, Controller, Post } from '@nestjs/common';
import { CreateJobOpportunityDto } from './dto/create';
import { JobOpportunityService } from './job-opportunity.service';

@Controller('job-opportunity')
export class JobOpportunityController {

    constructor(private readonly jobOpportunityService: JobOpportunityService) { }

    @Post()
    async create(@Body() createJobOpportunityDto: CreateJobOpportunityDto) {
        return this.jobOpportunityService.create(createJobOpportunityDto);
    }
}
