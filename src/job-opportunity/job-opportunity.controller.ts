import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "src/user/user.service";
import { CreateJobOpportunityDto } from "./dto/create";
import { ApplyJobOpportunityDto } from "./dtos/apply-job-opportunity.dto";
import { JobOpportunityService } from "./job-opportunity.service";

@Controller("job-opportunity")
export class JobOpportunityController {
  constructor(
    private readonly jobOpportunityService: JobOpportunityService,
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createJobOpportunityDto: CreateJobOpportunityDto) {
    return await this.jobOpportunityService.create(createJobOpportunityDto);
  }

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("majorJobCategoryId") majorJobCategoryId: string,
    @Query("city") city: string,
    @Query("term") term: string,
    @Query("route") route: string
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.jobOpportunityService.findAll({
      page,
      limit,
      route: `${process.env.CLIENT_URL}/${route}`,
      majorJobCategoryId,
      city,
      term,
    });
  }

  @Get("advertiser")
  @UseGuards(AuthGuard)
  async findAllByAdvertiser(
    @Req() request: Request,
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("majorJobCategoryId") majorJobCategoryId: string,
    @Query("city") city: string,
    @Query("term") term: string
  ) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.findAllByAdvertiser(userId, {
      page: Number(page),
      limit: Number(limit),
      route: "/job-opportunity/advertiser",
      majorJobCategoryId,
      city,
      term,
    });
  }

  @Get(":id")
  async findById(@Param("id") id: string, @Query("full") full: boolean) {
    if (full) {
      return await this.jobOpportunityService.findOneByIdWithRelations(id, [
        "jobCategory",
        "jobCategory.majorJobCategory",
      ]);
    }
    return await this.jobOpportunityService.findById(id);
  }

  @Post(":id/apply")
  @UseGuards(AuthGuard)
  async apply(@Param("id") id: string, @Req() request: Request) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.apply(id, userId);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async delete(@Param("id") id: string, @Req() request: Request) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.delete(id, userId);
  }

  @Delete(":id/soft")
  @UseGuards(AuthGuard)
  async softDelete(@Param("id") id: string, @Req() request: Request) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.softDelete(id, userId);
  }

  @Get(":id/applicants")
  @UseGuards(AuthGuard)
  async findApplicants(@Param("id") id: string, @Req() request: Request) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.findApplicants(id, userId);
  }

  @Get("applicants/all")
  @UseGuards(AuthGuard)
  async findAllApplicants(@Req() request: Request) {
    const cookie = request.cookies["jwt"];
    const user = await this.userService.getUserByCookie(cookie);
    const { id: userId } = user;
    return await this.jobOpportunityService.findAllApplicants(userId);
  }
}

export { ApplyJobOpportunityDto };
