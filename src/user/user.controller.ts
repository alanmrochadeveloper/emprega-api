import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './create-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post()
    async create(@Body() body: CreateUserDTO) {
        const password = await bcrypt.hash('1234', 12);
        const { role_id, ...data } = body;
        // return this.userService.create({
        //   ...data,
        //   password,
        //   role: { id: role_id },
        // });
    }
}
