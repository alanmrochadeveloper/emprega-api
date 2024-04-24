import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEmailModule } from "src/admin-email/admin-email.module";
import { AuthorizedDocumentsModule } from "src/authorized-documents/authorized-documents.module";
import { CategoryModule } from "src/category/category.module";
import { Company } from "src/company/company.entity";
import { CompanyModule } from "src/company/company.module";
import { CompanyService } from "src/company/company.service";
import { EmailModule } from "src/email/email.module";
import { Person } from "src/person/person.entity";
import { PersonModule } from "src/person/person.module";
import { PersonService } from "src/person/person.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person, Company]),
    CategoryModule,
    PersonModule,
    forwardRef(() => CompanyModule),
    AuthorizedDocumentsModule,
    AdminEmailModule,
    EmailModule,
    JwtModule.register({ secret: "secret", signOptions: { expiresIn: "1d" } }),
  ],
  providers: [UserService, PersonService, CompanyService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
