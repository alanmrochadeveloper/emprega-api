import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { CategoryService } from 'src/category/category.service';
import { CompanyService } from 'src/company/company.service';
import { EnumPersonType } from 'src/person/person.entity';
import { PersonService } from 'src/person/person.service';
import { validateCNPJ } from 'src/utils/cnpjValidation';
import { validateCPF } from 'src/utils/cpfValidation';
import { normalizeCnpj } from 'src/utils/normalizeCnpj';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly personService: PersonService,
        private readonly categoryService: CategoryService,
        private readonly companyService: CompanyService,
        private readonly jwtService: JwtService
    ) {

    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async create(registerDto: RegisterDTO) {
        const { first_name: firstName, last_name: lastName, address, cpf, phone_number: phoneNumber, email, password, category: categoryValue, cnpj, personType, companyNamePerson, personCNPJ: personCNPJDTO, tradingNamePerson, avatarPath: avatar, avatarFile, companyName, logo, logoFile, stateInscr, tradingName, stateInscrPerson: stateInscrPersonDTO } = registerDto
        //TODO: use this way to normalize, till I figure out how to fix transform itself in DTOs
        const personCNPJ = normalizeCnpj(personCNPJDTO)
        const stateInscrPerson = normalizeCnpj(stateInscrPersonDTO)
        try {
            if (!cpf && !personCNPJ) throw new BadRequestException(`O documento cpf ou cnpj não foram fornecidos`)
            if (cpf && !validateCPF((cpf))) throw new BadRequestException(`CPF não é válido!`)

            const isExistingPerson = await this.personService.findOneByCPF(cpf)

            if (isExistingPerson) throw new BadRequestException(`Esse cpf já se encontra em uso!`)

            if (personCNPJ && !validateCNPJ(personCNPJ)) throw new BadRequestException(`CNPJ não é válido!`)

            const isExistingPersonLegal = await this.personService.findOneByCNPJ(personCNPJ)
            if (isExistingPersonLegal) throw new BadRequestException(`O cnpj já está em uso!`)

            const isExistingAccount = await this.findOneByEmail(email);
            if (isExistingAccount) throw new BadRequestException(`Esse email já existe, tente outro email!`);

            const user = this.userRepository.create({ email, password, avatar, avatarFile })

            const category = await this.categoryService.getByValue(categoryValue);
            if (category.value === "Anunciante" && cnpj == null && personCNPJ == null) throw new BadRequestException(`O anunciante deve ter uma empresa  para os anunciar as vagas!`)

            if (personType === EnumPersonType.Fisica && category.value !== "Anunciante") {
                const person = await this.personService.save({ address, firstName, lastName, cpf: cpf, phoneNumber, category, type: personType })
                user.person = person;
                await this.userRepository.save(user);
                return {
                    email: user.email,
                    nome: person.firstName + " " + person.lastName
                }
            }

            if (personCNPJ && !validateCNPJ(personCNPJ)) throw new BadRequestException(`CNPJ da empresa não é válido!`)

            const isExisttingLegalPerson = await this.personService.findOneByCNPJ(personCNPJ)
            if (isExisttingLegalPerson) throw new BadRequestException(`Esse cnpj já se encontra em uso!`)

            const isExistingCompany = await this.companyService.findByCNPJ(cnpj)
            if (isExistingCompany) throw new BadRequestException(`Essa empresa já está cadastrada, peça para administrador da mesma autorizar seu cpf ou cnpj  para cadastrar em nome da empresa!`)

            const isExistingCompanyPerson = await this.personService.findOneByCNPJ(personCNPJ)
            if (isExistingCompanyPerson) throw new BadRequestException(`Esse cnpj já cadastrado`);

            const legalPerson = await this.personService.save({
                address, category, cnpj: personCNPJ, companyName: companyNamePerson, tradingName: tradingNamePerson, type: personType,
                phoneNumber, stateInscr: stateInscrPerson
            })

            const newFirstCompany = await this.companyService.create({ cnpj: cnpj ?? personCNPJ, companyName: companyName ?? companyNamePerson, logo: logo ?? avatar, logoFile: logoFile ?? avatarFile, stateInscr: stateInscr ?? stateInscrPerson, tradingName: tradingName ?? tradingNamePerson })

            if (newFirstCompany) legalPerson.companies = [newFirstCompany]

            user.person = legalPerson;

            await this.userRepository.save(user)

            return {
                email: user.email,
                nomeFantasia: legalPerson.tradingName, razaoSocial: legalPerson.companyName
            }


        } catch (e) {
            console.error(e.message)
            let message = e.message;
            throw new BadRequestException(message)
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.userRepository.findOneBy({ email })
        if (!user) throw new NotFoundException("usuário não encontrado");
        if (!await bcrypt.compare(password, user.password)) throw new BadRequestException("Credenciais Inválidas!")
        const jwt = this.jwtService.signAsync({ id: user.id })
        return jwt;
    }

    async getUserByCookie(cookie) {
        const { id } = await this.jwtService.verifyAsync(cookie)

        const user = await this.userRepository.findOneBy({ id })

        return user;

    }

    async findAll(options: { page: number; limit: number; route: string }) {
        const { page, limit, route } = options;
        const [results, total] = await this.userRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations: {
                person: {
                    category: true
                }
            },
            select: {
                email: true,
                id: true,
                person: {
                    firstName: true,
                    lastName: true,
                    category: {
                        value: true
                    }
                }
            },
        });

        return {
            data: results,
            count: total,
            currentPage: page,
            nextPage: total / limit > page ? `${route}?page=${page + 1}&limit=${limit}` : null,
            prevPage: page > 1 ? `${route}?page=${page - 1}&limit=${limit}` : null,
        };
    }
}
