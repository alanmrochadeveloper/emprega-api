import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobOpportunityModule } from './job-opportunity/job-opportunity.module';

@Module({
  imports: [PersonModule, CategoryModule, UserModule, AuthModule, JobOpportunityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
