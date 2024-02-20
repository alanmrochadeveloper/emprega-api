import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './create-user-dto';

@Controller('users')
export class UserController {
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
