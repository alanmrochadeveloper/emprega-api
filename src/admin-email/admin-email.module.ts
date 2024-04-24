import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEmailController } from "./admin-email.controller";
import { AdminEmail } from "./admin-email.entity";
import { AdminEmailService } from "./admin-email.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdminEmail])],
  providers: [AdminEmailService],
  controllers: [AdminEmailController],
  exports: [AdminEmailService],
})
export class AdminEmailModule {}
