import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async register(@Body() body: RegisterDTO) {
        const { password_confirm, ...data } = body;
        if (body.password !== password_confirm) throw new BadRequestException("Passwords doesn't match!")
        const hashed = await bcrypt.hash(body.password, 12)
        return this.userService.save({ ...data, password: hashed })

    }
    @Post("signin")
    async signin(@Body("email") email: string, @Body("password") password: string) {
        // rpasswordeturn this.se
    }
}
