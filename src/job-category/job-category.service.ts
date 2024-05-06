import {
  BadRequestException,
  Injectable,
  NotFoundException,
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

  async findOneByIdWithRelations(id: string, relations: string[]) {
    return await this.jobCategoryRepository.findOne({
      where: { id },
      relations,
    });
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

  async delete(id: string) {
    const jobCategory = await this.jobCategoryRepository.findOneBy({ id });
    if (!jobCategory) {
      throw new NotFoundException("Categoria de trabalho não encontrada!");
    }
    await this.jobCategoryRepository.remove(jobCategory);
  }

  async softDelete(id: string) {
    const jobCategory = await this.jobCategoryRepository.findOneBy({ id });
    if (!jobCategory) {
      throw new NotFoundException("Categoria de trabalho não encontrada!");
    }
    await this.jobCategoryRepository.softDelete(id);
  }

  async replace(
    id: string,
    updateJobCategoryDto: CreateJobCategoryDto,
    user: User
  ) {
    if (!user) {
      throw new UnauthorizedException(
        "Faça login para substituir uma categoria de trabalho!"
      );
    }

    const jobCategory = await this.jobCategoryRepository.findOneBy({ id });
    if (!jobCategory) {
      throw new NotFoundException("Categoria de trabalho não encontrada!");
    }

    const userWithPerson = await this.userService.findOneByIdWithRelations(
      user.id,
      ["person"]
    );
    const personWithCategory =
      await this.personService.findOneByIdWithRelations(
        userWithPerson.person.id,
        ["category"]
      );

    if (
      !userWithPerson.person ||
      personWithCategory.category.value !== CategoryEnum.Admin
    ) {
      throw new UnauthorizedException(
        "Usuário não autorizado para substituir categoria de trabalho!"
      );
    }

    const majorJobCategory = await this.majorJobCategoryService.findOneById(
      updateJobCategoryDto.majorJobCategoryId
    );
    if (!majorJobCategory) {
      throw new NotFoundException(
        "Categoria principal de trabalho não encontrada!"
      );
    }

    const updatedJobCategory = this.jobCategoryRepository.create({
      ...jobCategory,
      ...updateJobCategoryDto,
      majorJobCategory,
    });

    return await this.jobCategoryRepository.save(updatedJobCategory);
  }

  async update(
    id: string,
    updateJobCategoryDto: Partial<CreateJobCategoryDto>,
    user: User
  ) {
    if (!user) {
      throw new UnauthorizedException(
        "Faça login para atualizar uma categoria de trabalho!"
      );
    }

    const jobCategory = await this.jobCategoryRepository.findOneBy({ id });
    if (!jobCategory) {
      throw new NotFoundException("Categoria de trabalho não encontrada!");
    }

    const userWithPerson = await this.userService.findOneByIdWithRelations(
      user.id,
      ["person"]
    );
    if (
      !userWithPerson.person ||
      userWithPerson.person.category.value !== CategoryEnum.Admin
    ) {
      throw new UnauthorizedException(
        "Usuário não autorizado para atualizar categoria de trabalho!"
      );
    }

    if (updateJobCategoryDto.majorJobCategoryId) {
      const majorJobCategory = await this.majorJobCategoryService.findOneById(
        updateJobCategoryDto.majorJobCategoryId
      );
      if (!majorJobCategory) {
        throw new NotFoundException(
          "Categoria principal de trabalho não encontrada!"
        );
      }
      jobCategory.majorJobCategory = majorJobCategory;
    }

    const updatedJobCategory = this.jobCategoryRepository.merge(
      jobCategory,
      updateJobCategoryDto
    );
    return await this.jobCategoryRepository.save(updatedJobCategory);
  }
}
