import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEnum } from "src/category/category.entity";
import { MajorJobCategoryService } from "src/major-job-category/major-job-category.service";
import { PersonService } from "src/person/person.service";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateJobCategoryDto } from "./dtos/create-job-category-dtos";
import { JobCategory } from "./job-category.entity";

@Injectable()
export class JobCategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
    private readonly userService: UserService,
    private readonly personService: PersonService,
    private readonly majorJobCategoryService: MajorJobCategoryService
  ) {}

  async findOneById(id: string) {
    return await this.jobCategoryRepository.findOneBy({ id });
  }

  async findAll(page: number = 1, limit: number = 10, name: string) {
    const filters = { name };
    const skip = (page - 1) * limit;
    const [result, total] = await this.jobCategoryRepository.findAndCount({
      where: filters,
      skip,
      take: limit,
    });

    const lastPage = Math.ceil(total / limit);

    //TODO implement route here

    return {
      data: result,
      count: total,
      currentPage: page,
      nextPage: page < lastPage ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage: lastPage,
    };
  }

  async create(createJobCategoryDto: CreateJobCategoryDto, user: User) {
    console.log({ createJobCategoryDto });
    if (!user) {
      throw new UnauthorizedException(
        "Faça login para cadastrar uma categoria de trabalho!"
      );
    }
    const userWithPerson = await this.userService.findOneByIdWithRelations(
      user?.id,
      ["person"]
    );
    if (!userWithPerson.person) {
      throw new BadRequestException("Pessoa não encontrada!");
    }

    const personWithCategory =
      await this.personService.findOneByIdWithRelations(
        userWithPerson.person?.id,
        ["category"]
      );
    if (personWithCategory.category.value !== CategoryEnum.Admin) {
      throw new UnauthorizedException(
        "Usuário não autorizado para cadastrar categoria de trabalho!"
      );
    }
    const newJobCategory =
      this.jobCategoryRepository.create(createJobCategoryDto);
    const majorJobCategory = await this.majorJobCategoryService.findOneById(
      createJobCategoryDto.majorJobCategoryId
    );
    newJobCategory.majorJobCategory = majorJobCategory;
    return await this.jobCategoryRepository.save(newJobCategory);
  }
}
