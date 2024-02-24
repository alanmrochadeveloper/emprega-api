import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @Post("admin/register")
    async register(@Body() body: RegisterDTO) {
        const { password, password_confirm } = body;
        if (password !== password_confirm) throw new BadRequestException("Passwords doesn't match!")
        const hashed = await bcrypt.hash(password, 12)
        console.log({ hashed })

        return body;
    }
}
