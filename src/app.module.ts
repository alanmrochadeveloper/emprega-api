import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { JobOpportunityModule } from './job-opportunity/job-opportunity.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "root",
    password: "root",
    database: "99Emprega",
    autoLoadEntities: true,
    synchronize: true
  }),
    PersonModule, CategoryModule, UserModule, AuthModule, JobOpportunityModule, CompanyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
