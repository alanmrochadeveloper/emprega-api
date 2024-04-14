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
import { JobCategoryModule } from "./job-category/job-category.module";
import { JobOpportunityModule } from "./job-opportunity/job-opportunity.module";
import { PersonModule } from "./person/person.module";
import { UserModule } from "./user/user.module";

/*TypeOrmModule.forRoot ({
type: "postgres",
host: "db",
port: 5432,
username: "root",
password: "root",
database: "99Emprega",
autoLoadEntities: true,
synchronize: true
}) */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production"],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
