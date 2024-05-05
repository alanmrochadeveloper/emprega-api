import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import { CreateJobCategoryDto } from "./dtos/create-job-category-dtos";
import { JobCategoryService } from "./job-category.service";

@Controller("job-category")
export class JobCategoryController {
  constructor(
    private readonly jobCategoryService: JobCategoryService,
    private readonly userService: UserService
  ) {}

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("name") name: string
  ) {
    return this.jobCategoryService.findAll(page, limit, name);
  }

  @Post()
  async create(
    @Body() createJobCategoryDto: CreateJobCategoryDto,
    @Req() request: Request
  ) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    return this.jobCategoryService.create(createJobCategoryDto, user);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.jobCategoryService.delete(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string) {
    return this.jobCategoryService.softDelete(id);
  }
}
