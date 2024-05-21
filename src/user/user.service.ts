import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { AdminEmailService } from "src/admin-email/admin-email.service";
import { RegisterDTO } from "src/auth/dto/register.dto";
import { AuthorizedDocumentsStatus } from "src/authorized-documents/authorized-documents.entity";
import { AuthorizedDocumentsService } from "src/authorized-documents/authorized-documents.service";
import { CategoryEnum } from "src/category/category.entity";
import { CategoryService } from "src/category/category.service";
import { CompanyService } from "src/company/company.service";
import { EmailService } from "src/email/email.service";
import { EnumPersonType } from "src/person/person.entity";
import { PersonService } from "src/person/person.service";
import { validateCNPJ } from "src/utils/cnpjValidation";
import { validateCPF } from "src/utils/cpfValidation";
import { dayjsPtBr } from "src/utils/dayjs-ptbr";
import { expiresIn } from "src/utils/globals";
import { normalizeRegisterDocuments } from "src/utils/normalizeRegisterDocuments";
import { validateStateInscr } from "src/utils/stateInscrValidation";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./update-user-dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    private readonly personService: PersonService,
    private readonly categoryService: CategoryService,
    private readonly authorizedDocumentsService: AuthorizedDocumentsService,
    private readonly jwtService: JwtService,
    private readonly adminEmailService: AdminEmailService,
    private readonly emailService: EmailService
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: string, user: User) {
    const userWithPerson = await this.findOneByIdWithRelations(user.id, [
      "person",
    ]);

    if (!userWithPerson) throw new NotFoundException("Usuário não encontrado!");

    const personWithCategory =
      await this.personService.findOneByIdWithRelations(
        userWithPerson.person.id,
        ["category"]
      );
    if (!personWithCategory)
      throw new NotFoundException("Pessoa não encontrada!");

    if (
      userWithPerson.person.id !== id &&
      personWithCategory.category.value !== CategoryEnum.Admin
    )
      throw new UnauthorizedException(
        "Usuário não autorizado para visualizar usuários!"
      );

    const userToRetun = await this.findOneByIdWithRelations(id, [
      "person",
      "person.category",
    ]);

    return {
      email: userToRetun.email,
      name: userToRetun.person.firstName + " " + userToRetun.person.lastName,
      isActive: userToRetun.isActive,
      emailConfirmed: userToRetun.emailConfirmed,
      category: userToRetun.person.category.value,
    };
  }

  async findOneByIdWithRelations(id: string, relations: string[]) {
    return await this.userRepository.findOne({ where: { id }, relations });
  }

  async sendConfirmationEmail(email: string) {
    try {
      const user = await this.findOneByEmail(email);

      if (!user) throw new NotFoundException(`Esse email não está cadastrado`);
      if (user.emailConfirmed)
        throw new BadRequestException(`Esse email já foi confirmado!`);

      let message =
        "Um email de confirmação foi enviado para o seu endereço de email.";

      if (
        user.tokenExpiresDate &&
        user.tokenExpiresDate < dayjsPtBr().toDate()
      ) {
        message =
          "Esse token expirou! Um novo email de confirmação foi enviado para o seu endereço de email.";
      }

      user.confirmationToken = randomBytes(32).toString("hex");

      user.tokenExpiresDate = dayjsPtBr().add(100, "minute").toDate();
      await this.userRepository.save(user);

      await this.emailService.sendConfirmationEmail(
        user.email,
        user.confirmationToken
      );

      return {
        message,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async confirmEmail(confirmationToken: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({
      confirmationToken,
    });

    if (!user) {
      throw new BadRequestException("Token inválido.");
    }

    if (user.emailConfirmed) {
      throw new BadRequestException("Email já confirmado.");
    }

    if (user.tokenExpiresDate < dayjsPtBr().toDate()) {
      throw new BadRequestException("Token expirado.");
    }

    user.emailConfirmed = true;
    user.confirmationToken = null;
    user.tokenExpiresDate = null;

    await this.userRepository.save(user);

    return {
      message: "Email confirmado com sucesso!",
    };
  }

  async create(registerDto: RegisterDTO) {
    const {
      first_name: firstName,
      last_name: lastName,
      address,
      cpf: cpfDTO,
      phone_number: phoneNumber,
      email,
      password,
      category: categoryValue,
      cnpj: cnpjDTO,
      personType,
      companyNamePerson,
      personCNPJ: personCNPJDTO,
      tradingNamePerson,
      avatarPath: avatar,
      avatarFile,
      companyName,
      logo,
      logoFile,
      stateInscr: stateInscrDTO,
      tradingName,
      stateInscrPerson: stateInscrPersonDTO,
      employeesNumber,
    } = registerDto;
    //TODO: use this way to normalize, till I figure out how to fix transform itself in DTOs
    const { personCNPJ, stateInscrPerson, stateInscr, cpf, cnpj } =
      normalizeRegisterDocuments({
        personCNPJ: personCNPJDTO,
        stateInscrPerson: stateInscrPersonDTO,
        stateInscr: stateInscrDTO,
        cpf: cpfDTO,
        cnpj: cnpjDTO,
      });

    this.validateDocuments(cpf, personCNPJ ?? cnpj, stateInscrDTO);

    try {
      const isInscribedState =
        await this.companyService.findOneByStateInscr(stateInscr);
      if (isInscribedState)
        throw new BadRequestException(
          `Esta inscrição estadual já está em uso!`
        );

      const isExistingPerson = await this.personService.findOneByCPF(cpf);

      if (isExistingPerson)
        throw new BadRequestException(`Esse cpf já se encontra em uso!`);

      const isExistingPersonLegal =
        await this.personService.findOneByCNPJ(personCNPJ);
      if (isExistingPersonLegal)
        throw new BadRequestException(`O cnpj já está em uso!`);

      const isExistingAccount = await this.findOneByEmail(email);
      if (isExistingAccount)
        throw new BadRequestException(
          `Esse email já existe, tente outro email!`
        );

      const user = this.userRepository.create({
        email,
        password,
        avatar,
        avatarFile,
      });

      if (await this.isAdmin(email)) {
        return await this.makesAdmin(
          user,
          address,
          firstName,
          lastName,
          cpf,
          phoneNumber
        );
      }

      const category = await this.categoryService.getByValue(categoryValue);
      if (category.value === "Anunciante" && cnpj == null && personCNPJ == null)
        throw new BadRequestException(
          `O anunciante deve ter uma empresa para anunciar as vagas!`
        );

      if (
        personType === EnumPersonType.Fisica &&
        category.value === CategoryEnum.Candidato
      ) {
        const person = await this.personService.save({
          address,
          firstName,
          lastName,
          cpf: cpf,
          phoneNumber,
          category,
          type: personType,
        });
        user.person = person;
        await this.userRepository.save(user);
        const { message } = await this.sendConfirmationEmail(email);
        return {
          email: user.email,
          nome: person.firstName + " " + person.lastName,
          message,
        };
      }

      if (personCNPJ && !validateCNPJ(personCNPJ))
        throw new BadRequestException(`CNPJ da empresa não é válido!`);

      const isExistingLegalPerson =
        await this.personService.findOneByCNPJ(personCNPJ);
      if (isExistingLegalPerson)
        throw new BadRequestException(`Esse cnpj já se encontra em uso!`);

      const isExistingCompany = await this.companyService.findByCNPJ(cnpj);
      const isExistingAuthorizedDocument = isExistingCompany
        ? (await this.authorizedDocumentsService.findOneByCompanyIdAndDocument(
            isExistingCompany.id,
            cpf
          )) ||
          (await this.authorizedDocumentsService.findOneByCompanyIdAndDocument(
            isExistingCompany?.id,
            personCNPJ
          ))
        : undefined;
      if (isExistingCompany && !isExistingAuthorizedDocument) {
        this.authorizedDocumentsService.create({
          company: isExistingCompany,
          document: cpf ?? personCNPJ,
          status: AuthorizedDocumentsStatus.PENDING,
        });
        throw new BadRequestException(
          `Essa empresa já está cadastrada, peça para administrador da mesma autorizar seu cpf ou cnpj  para cadastrar em nome da empresa!`
        );
      }

      if (isExistingCompany && isExistingAuthorizedDocument) {
        if (
          isExistingAuthorizedDocument.status ===
          AuthorizedDocumentsStatus.PENDING
        ) {
          throw new BadRequestException(
            `Esse documento ainda não foi autorizado pelo administrador da empresa!`
          );
        }
        if (
          isExistingAuthorizedDocument.status ===
          AuthorizedDocumentsStatus.DENIED
        ) {
          throw new BadRequestException(
            `Esse documento foi negado pelo administrador da empresa!`
          );
        }
      }

      const isExistingCompanyPerson =
        await this.personService.findOneByCNPJ(personCNPJ);
      if (isExistingCompanyPerson)
        throw new BadRequestException(`Esse cnpj já cadastrado`);

      const legalPerson = await this.personService.save({
        cpf: cpf,
        firstName: firstName,
        lastName: lastName,
        address,
        category,
        cnpj: personCNPJ,
        companyName: companyNamePerson,
        tradingName: tradingNamePerson,
        type: personType,
        phoneNumber,
        stateInscr: stateInscrPerson,
      });

      const newFirstCompany = await this.companyService.create({
        cnpj: cnpj ?? personCNPJ,
        companyName: companyName ?? companyNamePerson,
        logo: logo ?? avatar,
        logoFile: logoFile ?? avatarFile,
        stateInscr: stateInscr ?? stateInscrPerson,
        tradingName: tradingName ?? tradingNamePerson,
        employeesNumber: employeesNumber ?? 0,
      });

      if (newFirstCompany) legalPerson.companies = [newFirstCompany];

      user.person = legalPerson;

      await this.userRepository.save(user);

      const { message } = await this.sendConfirmationEmail(email);

      await this.personService.save(legalPerson);

      return {
        email: user.email,
        nomeFantasia: legalPerson.tradingName,
        razaoSocial: legalPerson.companyName,
        firstName: legalPerson.firstName,
        lastName: legalPerson.lastName,
        cpf: legalPerson.cpf,
        cnpj: legalPerson.cnpj,
        message,
      };
    } catch (e) {
      console.error(e.message);
      let message = e.message;
      throw new BadRequestException(message);
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["person.category"],
    });

    if (!user) throw new NotFoundException("usuário não encontrado");

    if (!user.emailConfirmed)
      throw new BadRequestException(
        `Email não confirmado! Por favor cheque sua caixa de entrada e confirme o email!`
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException("Credenciais Inválidas!");

    if (!user.isActive)
      throw new BadRequestException(
        `Conta desativada! Entre em contato com um administrador.`
      );

    const jwt = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      { expiresIn }
    );
    return { jwt, user };
  }

  async getUserByCookie(cookie: string) {
    try {
      const { id } = await this.jwtService.verifyAsync(cookie);
      if (!id) throw new UnauthorizedException("Usuário não autenticado!");

      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          person: {
            category: true,
          },
        },
      });

      if (!user) throw new NotFoundException("Usuário não encontrado!");

      return user;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException(
          "Sua sessão expirou, por favor faça login novamente. Ou atualize a página (F5)."
        );
      }
      throw new UnauthorizedException(error.message);
    }
  }

  async findAll(options: {
    page: number;
    limit: number;
    route: string;
    user: User;
  }) {
    const { page, limit, route, user } = options;

    const userWithPerson = await this.findOneByIdWithRelations(user.id, [
      "person",
    ]);

    if (!userWithPerson.person)
      throw new NotFoundException("Usuário não encontrado!");

    const personWithCategory =
      await this.personService.findOneByIdWithRelations(
        userWithPerson.person.id,
        ["category"]
      );

    if (personWithCategory.category.value !== CategoryEnum.Admin) {
      throw new UnauthorizedException(
        "Usuário não autorizado para visualizar usuários!"
      );
    }

    const [results, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        person: {
          category: true,
          applications: true,
          companies: {
            jobOpportunities: true,
          },
        },
      },
      select: {
        isActive: true,
        emailConfirmed: true,
        email: true,
        id: true,
        person: {
          firstName: true,
          lastName: true,
          category: {
            value: true,
          },
          companies: {
            cnpj: true,
            companyName: true,
            stateInscr: true,
            tradingName: true,
            jobOpportunities: true,
          },
          applications: true,
        },
      },
    });

    return {
      data: results,
      count: total,
      currentPage: page,
      nextPage:
        total / limit > page
          ? `${route}?page=${page + 1}&limit=${limit}`
          : null,
      prevPage: page > 1 ? `${route}?page=${page - 1}&limit=${limit}` : null,
    };
  }

  validateDocuments(cpf: string, cnpj: string, stateInscr: string) {
    if (!cpf && !cnpj)
      throw new BadRequestException(
        `O documento cpf ou cnpj não foram fornecidos`
      );
    if (cpf && !validateCPF(cpf))
      throw new BadRequestException(`CPF não é válido!`);
    if (stateInscr && !validateStateInscr(stateInscr))
      throw new BadRequestException(`Inscrição Estadual não é válida!`);
    if (cnpj && !validateCNPJ(cnpj))
      throw new BadRequestException(`CNPJ não é válido!`);
  }

  async isAdmin(email: string) {
    return await this.adminEmailService.isAdmin(email);
  }

  async makesAdmin(
    user: User,
    address: string,
    firstName: string,
    lastName: string,
    cpf: string,
    phoneNumber: string
  ) {
    const adminCategory = await this.categoryService.getByValue(
      CategoryEnum.Admin
    );
    const person = await this.personService.save({
      address,
      firstName,
      lastName,
      cpf,
      phoneNumber,
      category: adminCategory,
      type: EnumPersonType.Fisica,
    });
    user.person = person;
    await this.userRepository.save(user);
    const { message } = await this.sendConfirmationEmail(user.email);
    return {
      message: `Usuário Administrador criado com sucesso! ${message}`,
      email: user.email,
      firstName: person.firstName,
      lastName: person.lastName,
      cpf: person.cpf,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDTO, userId: string) {
    const userToUpdate = await this.findOneByIdWithRelations(id, ["person"]);
    const userToOperate = await this.findOneByIdWithRelations(userId, [
      "person",
    ]);

    if (!userToUpdate) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    const personWithCategory =
      await this.personService.findOneByIdWithRelations(
        userToOperate.person.id,
        ["category"]
      );

    if (
      userToUpdate.person.id !== userId &&
      personWithCategory.category.value !== CategoryEnum.Admin
    ) {
      throw new UnauthorizedException(
        "Usuário não autorizado para atualizar usuários!"
      );
    }

    const updatedUser = this.userRepository.merge(userToUpdate, updateUserDto);

    //TODO: reason about if it will be changed here or if will be only changed in a specific function
    if (updateUserDto.password) {
      userToUpdate.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    const isAdmin = personWithCategory.category.value === CategoryEnum.Admin;

    if (!isAdmin && updateUserDto.email)
      throw new UnauthorizedException(
        "Usuário não autorizado para atualizar email!"
      );

    const newCategory = await this.categoryService.getByValue(
      updateUserDto.category
    );

    if (newCategory && !isAdmin)
      throw new UnauthorizedException(
        "Usuário não autorizado para atualizar categoria!"
      );

    userToUpdate.person.category = newCategory;

    if (updateUserDto.email) userToUpdate.email = updateUserDto.email;

    const personToUpdate = await this.personService.findOneByIdWithRelations(
      userToUpdate.person.id,
      ["category"]
    );

    const updatedPerson = Object.assign(personToUpdate, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      category: newCategory,
    });

    await this.personService.save(updatedPerson);

    await this.userRepository.save(userToUpdate);

    return {
      message: "Usuário atualizado com sucesso!",
      updatedUser,
    };
  }
}
