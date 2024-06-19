import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { Request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateUserDTO } from "./create-user-dto";
import { UpdateUserDTO } from "./update-user-dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() body: CreateUserDTO) {
    // TODO: ver se realmente vamos usar esse endpoint e como, e se realmente vamos usar roles no MVP
    const password = await bcrypt.hash("1234", 12);
    const { role_id, ...data } = body;
    // return this.userService.create({
    //   ...data,
    //   password,
    //   role: { id: role_id },
    // });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("baseRoute") baseRoute = "http://localhost:3000/users",
    @Req() request: Request
  ) {
    limit = limit > 100 ? 100 : limit;
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    return this.userService.findAll({
      page,
      limit,
      route: baseRoute,
      user,
    });
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  async findById(@Param("id") id: string, @Req() request: Request) {
    const user = await this.userService.getUserByCookie(request.cookies["jwt"]);
    return await this.userService.findOneById(id, user);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: UpdateUserDTO,
    @Req() request: Request
  ) {
    const user = await this.userService.getUserByCookie(request.cookies["jwt"]);
    return this.userService.update(id, body, user.id);
  }
}
