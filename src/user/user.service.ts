import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity'; // Adjust the import path as necessary
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>
        , @InjectRepository(Person) private readonly personRepository: Repository<Person>
        , private readonly jwtService: JwtService
    ) {

    }

    async save(registerDto: RegisterDTO) {
        const { first_name, last_name, address, cpf, phone_number, email, password } = registerDto
        try {
            const personCreated = await this.personRepository.save({ firstName: first_name, lastName: last_name, address: address, CPF: cpf, phoneNumber: phone_number })
            console.log({ personCreated })
            const userCreated = await this.userRepository.save({ email, password, personId: personCreated.id });
            console.log(
                { userCreated })
            return {
                email: userCreated.email,
                nome: personCreated.firstName + " " + personCreated.lastName
            }
        } catch (e) {
            console.error("error = ", { ...e })
            let message = "Um erro ocorreu";
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
            select: {
                email: true,
                person: {
                    firstName: true,
                    lastName: true
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
