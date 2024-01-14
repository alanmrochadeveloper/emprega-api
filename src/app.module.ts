import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PersonModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
