import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyModule } from "src/company/company.module";
import { JobApplicationModule } from "src/job-application/job-application.module";
import { JobCategoryModule } from "src/job-category/job-category.module";
import { PersonModule } from "src/person/person.module";
import { UserModule } from "src/user/user.module";
import { expiresIn } from "src/utils/globals";
import { JobOpportunityController } from "./job-opportunity.controller";
import { JobOpportunityService } from "./job-opportunity.service";
import { JobOpportunity } from "./jobOpportunity.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOpportunity]),
    CompanyModule,
    UserModule,
    PersonModule,
    JobCategoryModule,
    JobApplicationModule,
    JwtModule.register({
      secret: "secret", // Use an environment variable for production
      signOptions: { expiresIn },
    }),
  ],
  providers: [JobOpportunityService],
  controllers: [JobOpportunityController],
})
export class JobOpportunityModule {}
