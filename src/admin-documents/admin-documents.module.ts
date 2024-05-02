import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "src/person/person.module";
import { UserModule } from "src/user/user.module";
import { expiresIn } from "src/utils/globals";
import { AdminDocumentsController } from "./admin-documents.controller";
import { AdminDocuments } from "./admin-documents.entity";
import { AdminDocumentsService } from "./admin-documents.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminDocuments]),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn },
    }),
    PersonModule,
    forwardRef(() => UserModule),
  ],
  providers: [AdminDocumentsService],
  controllers: [AdminDocumentsController],
  exports: [AdminDocumentsService],
})
export class AdminDocumentsModule {}
