import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { cookieOptions } from "src/utils/globals";
import { AuthGuard } from "./auth.guard";
import { RegisterDTO } from "./dto/register.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) { }

  @Post("register")
  async register(@Body() body: RegisterDTO) {
    const { password_confirm, password, ...data } = body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new BadRequestException(
        "A senha deve conter pelo menos 1 símbolo, 1 letra maiúscula, 1 número e ter no mínimo 8 caracteres."
      );
    }
    if (password !== password_confirm)
      throw new BadRequestException("As senhas não coincidem!");
    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      ...data,
      password: hashed,
      password_confirm,
    });
  }

  @Post("signin")
  async signIn(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const { jwt, user } = await this.userService.signIn(email, password);
    response.cookie("jwt", jwt, cookieOptions);
    return {
      message: "success",
      category: user.person.category.value,
      name: user.person.firstName + " " + user.person.lastName,
      email: user.email,
    };
  }

  // @UseGuards(AuthGuard)
  @Get("user")
  async getUserByCookie(@Req() request: Request) {
    const cookie = request.cookies["jwt"];
    if (!cookie) throw new UnauthorizedException("Usuário não autenticado!");
    const user = await this.userService.getUserByCookie(cookie);
    const { email, person } = user;
    return {
      email,
      category: person.category.value,
      name: person.firstName + " " + person.lastName,
    };
  }

  @UseGuards(AuthGuard)
  @Post("signout")
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("jwt", cookieOptions);
    return {
      message: "success",
    };
  }

  @Post("confirm-email")
  async confirmEmail(@Body("token") token: string) {
    await this.userService.confirmEmail(token);
  }

  @Post("send-confirmation-email")
  async sendConfirmationEmailToUser(@Body("email") email: string) {
    try {
      return await this.userService.sendConfirmationEmail(email);
    } catch (error) {
      throw new BadRequestException(
        "Erro ao enviar email de confirmação: " + error.message
      );
    }
  }

}
