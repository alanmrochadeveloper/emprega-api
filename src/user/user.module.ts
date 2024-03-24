import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Person } from 'src/person/person.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Person]), CategoryModule,
  JwtModule.register({ secret: 'secret', signOptions: { expiresIn: "1d" } })],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
