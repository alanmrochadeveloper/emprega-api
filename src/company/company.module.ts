import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "src/person/person.module";
import { UserModule } from "src/user/user.module";
import { expiresIn } from "src/utils/globals";
import { CompanyController } from "./company.controller";
import { Company } from "./company.entity";
import { CompanyService } from "./company.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn },
    }),
    forwardRef(() => UserModule),
    PersonModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
