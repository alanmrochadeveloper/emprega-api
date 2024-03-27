import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { JobOpportunityController } from './job-opportunity.controller';
import { JobOpportunityService } from './job-opportunity.service';
import { JobOpportunity } from './jobOpportunity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobOpportunity]), CompanyModule],
  providers: [JobOpportunityService],
  controllers: [JobOpportunityController]
})
export class JobOpportunityModule { }
