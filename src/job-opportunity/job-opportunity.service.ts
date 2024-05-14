import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEnum } from "src/category/category.entity";
import { CompanyService } from "src/company/company.service";
import { ApplicationStatusEnum } from "src/job-application/entities/job-application.entity";
import { JobApplicationService } from "src/job-application/job-application.service";
import { JobCategoryService } from "src/job-category/job-category.service";
import { PersonService } from "src/person/person.service";
import { UserService } from "src/user/user.service";
import { Like, Repository } from "typeorm";
import { CreateJobOpportunityDto } from "./dto/create";
import { JobOpportunity } from "./jobOpportunity.entity";

@Injectable()
export class JobOpportunityService {
  constructor(
    @InjectRepository(JobOpportunity)
    private readonly jobOpportunityRepository: Repository<JobOpportunity>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private readonly personService: PersonService,
    private readonly jobCategoryService: JobCategoryService,
    private readonly applicationService: JobApplicationService
  ) {}
  async create(payload: Partial<CreateJobOpportunityDto>) {
    const { companyId, jobCategoryId } = payload;
    const company = await this.companyService.findOneById(companyId);
    if (!company) throw new NotFoundException(`Empresa não encontrada!`);
    const jobCategory =
      await this.jobCategoryService.findOneById(jobCategoryId);
    if (!jobCategory)
      throw new NotFoundException(`Categoria de trabalho não encontrada!`);
    const jobOpportunity = this.jobOpportunityRepository.create(payload);
    jobOpportunity.company = company;
    jobOpportunity.jobCategory = jobCategory;
    return await this.jobOpportunityRepository.save(jobOpportunity);
  }

  async findAll({ page, limit, route, majorJobCategoryId, city, term }) {
    const whereCondition: any = {};
    if (city) {
      whereCondition.location = city;
    }

    if (term) {
      whereCondition.description = Like(`%${term}%`);
    }

    if (majorJobCategoryId) {
      whereCondition.jobCategory = {
        majorJobCategory: {
          id: majorJobCategoryId,
        },
      };
    }
    const [results, total] = await this.jobOpportunityRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: "DESC" },
      relations: {
        applications: {
          person: true,
        },
        company: true,
        jobCategory: {
          majorJobCategory: true,
        },
      },
      where: whereCondition,
    });

    return {
      currentPage: page,
      count: total,
      data: results,
      nextPage:
        total / limit > page
          ? `${route}?page=${page + 1}&limit=${limit}`
          : null,
      prevPage: page > 1 ? `${route}?page=${page - 1}&limit=${limit}` : null,
    };
  }

  async findAllByAdvertiser(
    userId: string,
    { page, limit, route, majorJobCategoryId, city, term }
  ) {
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person.companies.jobOpportunities.applications.person",
      "person.category",
    ]);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (user.person.category.value === CategoryEnum.Admin) {
      return await this.findAll({
        page,
        limit,
        route,
        majorJobCategoryId,
        city,
        term,
      });
    }

    const jobOpportunities = user.person.companies.flatMap(
      (company) => company.jobOpportunities
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = jobOpportunities.slice(startIndex, endIndex);

    return {
      currentPage: page,
      count: jobOpportunities.length,
      data: results,
      nextPage:
        jobOpportunities.length > endIndex
          ? `${route}?page=${page + 1}&limit=${limit}`
          : null,
      prevPage: page > 1 ? `${route}?page=${page - 1}&limit=${limit}` : null,
    };
  }

  async apply(id: string, userId: string) {
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person",
    ]);
    if (!user) throw new NotFoundException(`Usuário não encontrado!`);

    const person = await this.personService.findOneByIdWithRelations(
      user.person?.id,
      ["category"]
    );

    if (!person) throw new NotFoundException(`Pessoa não encontrada!`);
    if (person.category.value !== "Candidato")
      throw new BadRequestException(`Usuário não é um candidato!`);

    const jobOpportunity = await this.findOneByIdWithRelations(id, [
      "applications",
      "applications.person",
    ]);
    if (!jobOpportunity)
      throw new NotFoundException(`Oportunidade de trabalho não encontrada!`);

    const applicant = jobOpportunity.applications.find(
      (application) => application.person.id === person.id
    );
    if (applicant)
      throw new BadRequestException(
        `Você já se candidatou a esta oportunidade!`
      );
    const newApplication = this.applicationService.create({
      person,
      jobOpportunity,
      applicationStatus: ApplicationStatusEnum.APLICADO,
    });

    await this.applicationService.save(newApplication);

    const applications = [...jobOpportunity.applications, newApplication];

    jobOpportunity.applications = applications;

    return await this.jobOpportunityRepository.save(jobOpportunity);
  }

  async findOneByIdWithRelations(id: string, relations: string[]) {
    return await this.jobOpportunityRepository.findOne({
      where: { id },
      relations,
    });
  }

  async findById(id: string) {
    const jobOpportunity = await this.jobOpportunityRepository.findOneBy({
      id,
    });
    if (!jobOpportunity) {
      throw new NotFoundException(
        `Oportunidade de trabalho com ID ${id} não encontrada.`
      );
    }
    return jobOpportunity;
  }

  async softDelete(id: string, userId: string) {
    const jobOpportunity = await this.findById(id);
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person",
    ]);
    if (!user) throw new NotFoundException(`Usuário não encontrado!`);

    const personWithCompany = await this.personService.findOneByIdWithRelations(
      user.person.id,
      ["companies", "category"]
    );

    if (
      !personWithCompany.companies.some(
        (company) => company.id === jobOpportunity.company.id
      ) &&
      personWithCompany.category.value !== "Admin"
    )
      throw new ForbiddenException(`Usuário não é anunciante da empresa!`);

    return await this.jobOpportunityRepository.softDelete(jobOpportunity.id);
  }

  async delete(id: string, userId: string) {
    const jobOpportunity = await this.findById(id);
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person",
    ]);
    if (!user) throw new NotFoundException(`Usuário não encontrado!`);

    const personWithCompany = await this.personService.findOneByIdWithRelations(
      user.person.id,
      ["companies", "category"]
    );

    if (
      !personWithCompany.companies.some(
        (company) => company.id === jobOpportunity.company.id
      ) &&
      personWithCompany.category.value !== "Admin"
    )
      throw new ForbiddenException(`Usuário não é anunciante da empresa!`);

    return await this.jobOpportunityRepository.remove(jobOpportunity);
  }

  async findApplicants(id: string, userId: string) {
    const jobOpportunity = await this.findOneByIdWithRelations(id, [
      "applications",
      "applications.person",
    ]);
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person",
    ]);
    if (!user) throw new NotFoundException(`Usuário não encontrado!`);
    const personWithCompany = await this.personService.findOneByIdWithRelations(
      user.person.id,
      ["companies", "category"]
    );
    if (
      !personWithCompany.companies.some(
        (company) => company.id === jobOpportunity.company.id
      ) &&
      personWithCompany.category.value !== "Admin"
    )
      throw new ForbiddenException(
        `Usuário não tem permissão para ver os candidatos!`
      );
    return jobOpportunity.applications;
  }

  async findAllApplicants(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const user = await this.userService.findOneByIdWithRelations(userId, [
      "person",
      "person.category",
      "person.companies.jobOpportunities.applications",
    ]);
    if (!user) throw new NotFoundException(`Usuário não encontrado`);
    const skip = (page - 1) * limit;
    const take = limit;
    if (user.person.category.value === CategoryEnum.Admin) {
      const [jobOpportunities, total] =
        await this.jobOpportunityRepository.findAndCount({
          relations: ["applications", "applications.person"],
          skip,
          take,
        });
      const distinctApplicants = jobOpportunities
        .flatMap((jobOpportunity) => jobOpportunity.applications)
        .filter(
          (application, index, self) =>
            index === self.findIndex((a) => a.id === application.id)
        );
      return {
        data: distinctApplicants,
        count: distinctApplicants.length,
        currentPage: page,
        nextPage: total > page * limit ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      };
    }
    const applicants = user.person.companies.flatMap((company) =>
      company.jobOpportunities.flatMap((jobOpportunity) =>
        jobOpportunity.applications.map((application) => application)
      )
    );
    const distinctApplicants = applicants.filter(
      (application, index, self) =>
        index === self.findIndex((a) => a.id === application.id)
    );
    const paginatedApplicants = distinctApplicants.slice(skip, skip + take);
    return {
      data: paginatedApplicants,
      count: distinctApplicants.length,
      currentPage: page,
      nextPage: distinctApplicants.length > page * limit ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }
}
