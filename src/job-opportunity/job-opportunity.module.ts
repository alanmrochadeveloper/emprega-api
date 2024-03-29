import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { JobCategoryModule } from 'src/job-category/job-category.module';
import { PersonModule } from 'src/person/person.module';
import { UserModule } from 'src/user/user.module';
import { JobOpportunityController } from './job-opportunity.controller';
import { JobOpportunityService } from './job-opportunity.service';
import { JobOpportunity } from './jobOpportunity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobOpportunity]), CompanyModule, UserModule, PersonModule, JobCategoryModule],
  providers: [JobOpportunityService],
  controllers: [JobOpportunityController]
})
export class JobOpportunityModule { }
