import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

    }

    async save(options: Partial<User>) {
        try {
            await this.userRepository.save(options);
        } catch (e) {
            console.error("error = ", { ...e })
            let message = "Um erro ocorreu";
            const code = e.code;
            if (code === "23505") message = "Esse email já existe!"
            throw new BadRequestException(message)
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) throw new NotFoundException("usuário não encontrado");
        if (!await bcrypt.compare(password, user.password)) throw new BadRequestException("Credenciais Inválidas!")
        return user;
    }
}
