import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Person } from 'src/person/person.entity';
import { PersonModule } from 'src/person/person.module';
import { PersonService } from 'src/person/person.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Person]), CategoryModule, PersonModule,
  JwtModule.register({ secret: 'secret', signOptions: { expiresIn: "1d" } })],
  providers: [UserService, PersonService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
