import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateJobOpportunityDto } from "./dto/create";
import { ApplyJobOpportunityDto } from "./dtos/apply-job-opportunity.dto";
import { JobOpportunityService } from "./job-opportunity.service";

@Controller("job-opportunity")
export class JobOpportunityController {
  constructor(private readonly jobOpportunityService: JobOpportunityService) {}

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

  @Post(":id/apply")
  async apply(
    @Param("id") id: string,
    @Body() applyJobOpportunityDto: ApplyJobOpportunityDto
  ) {
    return await this.jobOpportunityService.apply(id, applyJobOpportunityDto);
  }
}
export { ApplyJobOpportunityDto };
