import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { CategoryService } from 'src/category/category.service';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly personService: PersonService,
        private readonly categoryService: CategoryService,
        private readonly jwtService: JwtService
    ) {

    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async save(registerDto: RegisterDTO) {
        const { first_name: firstName, last_name: lastName, address, cpf: CPF, phone_number: phoneNumber, email, password, category: categoryValue } = registerDto
        try {

            const isExistingAccount = await this.findOneByEmail(email);
            if (isExistingAccount) throw new BadRequestException(`Esse email já existe, tente um outro email!`);
            const category = await this.categoryService.getByValue(categoryValue);
            const person = await this.personService.save({ address, firstName, lastName, CPF, phoneNumber, category })
            const user = this.userRepository.create({ email, password, person })
            await this.userRepository.save(user);
            return {
                email: user.email,
                nome: person.firstName + " " + person.lastName
            }
        } catch (e) {
            console.error(e.message)
            let message = e.message;
            const code = e.code;
            if (code === "23505") message = "Esse email já existe!"
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
