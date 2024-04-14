import { Module } from '@nestjs/common';
import { AdminEmailService } from './admin-email.service';
import { AdminEmailController } from './admin-email.controller';

@Module({
  providers: [AdminEmailService],
  controllers: [AdminEmailController]
})
export class AdminEmailModule {}
