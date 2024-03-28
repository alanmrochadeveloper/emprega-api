import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateJobOpportunityDto } from './dto/create';
import { ApplyJobOpportunityDto } from './dtos/apply-job-opportunity.dto';
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

    @Post(":id/apply")
    async apply(@Param("id") id: string, @Body() applyJobOpportunityDto: ApplyJobOpportunityDto) {
        return await this.jobOpportunityService.apply(id, applyJobOpportunityDto);
    }
}
export { ApplyJobOpportunityDto };

