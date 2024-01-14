import { Module } from '@nestjs/common';
import { JobOpportunityService } from './job-opportunity.service';
import { JobOpportunityController } from './job-opportunity.controller';

@Module({
  providers: [JobOpportunityService],
  controllers: [JobOpportunityController]
})
export class JobOpportunityModule {}
