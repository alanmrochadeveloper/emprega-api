import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateUserDTO } from "./create-user-dto";
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
    @Query("baseRoute") baseRoute = "http://localhost:3000/users"
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: baseRoute,
    });
  }
}
