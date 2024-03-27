import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateJobOpportunityDto } from './dto/create';
import { JobOpportunityService } from './job-opportunity.service';

@Controller('job-opportunity')
export class JobOpportunityController {

    constructor(private readonly jobOpportunityService: JobOpportunityService) { }

    @Post()
    async create(@Body() createJobOpportunityDto: CreateJobOpportunityDto) {
        return await this.jobOpportunityService.create(createJobOpportunityDto);
    }
    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.jobOpportunityService.findAll({
            page,
            limit,
            route: 'http://localhost:8000/api/job-opportunity',
        });
    }
}
