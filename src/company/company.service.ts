import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { validateCNPJ } from 'src/utils/cnpjValidation';
import { normalizeCnpj } from 'src/utils/normalizeCnpj';
import { normalizeStateInscr } from 'src/utils/normalizeStateInscr';
import { validateStateInscr } from 'src/utils/stateInscrValidation';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dtos/create-company-dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private personService: PersonService
    ) {

    }

    async findByCNPJ(cnpj: string) {
        if (!cnpj) return null;
        return await this.companyRepository.findOneBy({ cnpj })
    }

    async findOneByStateInscr(stateInscr: string) {
        if (!stateInscr) return null;
        return await this.companyRepository.findOneBy({ stateInscr })
    }

    async findAll(query: { user: User, page: number, limit: number, companyName?: string, cnpj?: string, stateInscr?: string }) {
        const { page, limit, companyName, cnpj, stateInscr } = query;
        const skip = (page - 1) * limit;
        const person = (await this.userService.findOneByIdWithRelations(query.user.id, ['person']))?.person;
        if (!person) throw new NotFoundException('Cadastro de pessoa não encontrado');
        return await this.companyRepository.find({
            where: { companyName, cnpj, stateInscr, advertisers: { id: person.id } },
            relations: { advertisers: true, jobOpportunities: true, },
            skip,
            take: limit,
        });
    }

    async create(company: Partial<Company>) {
        const companyToBeStored = this.companyRepository.create(company)
        return await this.companyRepository.save(companyToBeStored)
    }

    async createForPerson(companyData: CreateCompanyDto, user: User) {
        const userWithPerson = await this.userService.findOneByIdWithRelations(user.id, ['person']);
        if (!userWithPerson) throw new NotFoundException('usuário não existe!')

        const companyDataNormalized = this.normalizeCompanyData(companyData);

        await this.validateCompany(companyDataNormalized);

        const personCompany = await this.personService.findOneById(userWithPerson.person.id);

        const company = this.companyRepository.create({
            advertisers: [{ id: personCompany.id }],
            ...companyDataNormalized
        });

        return await this.companyRepository.save(company);
    }

    async findOneById(id: string) {
        return await this.companyRepository.findOneBy({ id })
    }

    async validateCompany(companyData: CreateCompanyDto) {
        if (!companyData.cnpj || !validateCNPJ(companyData.cnpj)) {
            throw new BadRequestException('CNPJ inválido');
        }

        if (!companyData.stateInscr || !validateStateInscr(companyData.stateInscr)) {
            throw new BadRequestException('Inscrição Estadual inválida');
        }

        const existingCompany = await this.findByCNPJ(companyData.cnpj);
        if (existingCompany) {
            throw new BadRequestException('Já existe uma empresa com esse CNPJ');
        }

        if (companyData.stateInscr) {
            const existingCompanyByStateInscr = await this.findOneByStateInscr(companyData.stateInscr);
            if (existingCompanyByStateInscr) {
                throw new BadRequestException('Já existe uma empresa com essa Inscrição Estadual');
            }
        }

    }

    normalizeCompanyData(companyData: CreateCompanyDto): CreateCompanyDto {
        return {
            ...companyData,
            cnpj: normalizeCnpj(companyData.cnpj),
            stateInscr: normalizeStateInscr(companyData.stateInscr)
        }
    }

}

