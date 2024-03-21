import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { RegisterDTO } from './dto/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async register(@Body() body: RegisterDTO) {
        const { password_confirm, password, ...data } = body;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            throw new BadRequestException("A senha deve conter pelo menos 1 símbolo, 1 letra maiúscula, 1 número e ter no mínimo 8 caracteres.");
        }
        if (password !== password_confirm) throw new BadRequestException("As senhas não coincidem!")
        const hashed = await bcrypt.hash(body.password, 12)
        return this.userService.save({ ...data, password: hashed, password_confirm })
    }

    @Post("signin")
    async signIn(@Body("email") email: string,
        @Body("password") password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const jwt = await this.userService.signIn(email, password);
        response.cookie("jwt", jwt, { httpOnly: true })
        return {
            message: "success"
        }
    }

    @UseGuards(AuthGuard)
    @Get("user")
    async getUserByCookie(@Req() request: Request) {
        const cookie = request.cookies['jwt']
        return await this.userService.getUserByCookie(cookie)
    }

    @UseGuards(AuthGuard)
    @Post("signout")
    async signOut(@Res({ passthrough: true }) res: Response) {
        res.clearCookie("jwt")
        return {
            message: "success"
        }
    }
}
