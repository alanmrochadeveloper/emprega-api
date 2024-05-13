import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateJobApplicationDto } from "./dto/update-job-application.dto";
import { JobApplication } from "./entities/job-application.entity";

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>
  ) {}
  create(createJobApplicationDto: Partial<JobApplication>) {
    return this.applicationRepository.create(createJobApplicationDto);
  }

  async save(application: JobApplication) {
    return await this.applicationRepository.save(application);
  }

  findAll() {
    return `This action returns all jobApplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`;
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    return `This action updates a #${id} jobApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`;
  }
}
