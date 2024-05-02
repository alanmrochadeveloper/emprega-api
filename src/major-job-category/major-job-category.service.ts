import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMajorJobCategoryDto } from "./dto/create-major-job-category.dto";
import { UpdateMajorJobCategoryDto } from "./dto/update-major-job-category.dto";
import { MajorJobCategory } from "./entities/major-job-category.entity";

@Injectable()
export class MajorJobCategoryService {
  constructor(
    @InjectRepository(MajorJobCategory)
    private majorJobCategoryRepository: Repository<MajorJobCategory>
  ) {}

  create(createMajorJobCategoryDto: CreateMajorJobCategoryDto) {
    return "This action adds a new majorJobCategory";
  }

  async findAll() {
    return await this.majorJobCategoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} majorJobCategory`;
  }

  async findOneById(id: string) {
    return await this.majorJobCategoryRepository.findOneBy({ id });
  }

  update(id: number, updateMajorJobCategoryDto: UpdateMajorJobCategoryDto) {
    return `This action updates a #${id} majorJobCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} majorJobCategory`;
  }
}
