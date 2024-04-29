import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminDocumentsModule } from "./admin-documents/admin-documents.module";
import { AdminEmailModule } from "./admin-email/admin-email.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthorizedDocumentsModule } from "./authorized-documents/authorized-documents.module";
import { CategoryModule } from "./category/category.module";
import { CompanyModule } from "./company/company.module";
import { EmailModule } from "./email/email.module";
import { JobCategoryModule } from "./job-category/job-category.module";
import { JobOpportunityModule } from "./job-opportunity/job-opportunity.module";
import { PersonModule } from "./person/person.module";
import { UserModule } from "./user/user.module";
import { MajorJobCategoryModule } from './major-job-category/major-job-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production"],
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as "postgres",
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === "true",
      synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
      logging: process.env.TYPEORM_LOGGING === "true",
      migrations: [process.env.TYPEORM_MIGRATIONS],
      migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
      entities: [process.env.TYPEORM_ENTITIES],
      // ssl: false,
      ssl: { rejectUnauthorized: false },
    }),
    PersonModule,
    CategoryModule,
    UserModule,
    AuthModule,
    JobOpportunityModule,
    CompanyModule,
    UserModule,
    AuthorizedDocumentsModule,
    JobCategoryModule,
    AdminDocumentsModule,
    AdminEmailModule,
    EmailModule,
    MajorJobCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
