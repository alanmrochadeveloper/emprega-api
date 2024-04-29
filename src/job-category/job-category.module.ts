import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MajorJobCategoryModule } from "src/major-job-category/major-job-category.module";
import { PersonModule } from "src/person/person.module";
import { UserModule } from "src/user/user.module";
import { JobCategoryController } from "./job-category.controller";
import { JobCategory } from "./job-category.entity";
import { JobCategoryService } from "./job-category.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobCategory]),
    UserModule,
    PersonModule,
    MajorJobCategoryModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [JobCategoryService],
  exports: [JobCategoryService],
  controllers: [JobCategoryController],
})
export class JobCategoryModule {}
