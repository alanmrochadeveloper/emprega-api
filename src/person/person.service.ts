import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async save(createPersonDto: Partial<Person>): Promise<Person> {
        const person = this.personRepository.create(createPersonDto);
        await this.personRepository.save(person);
        return person;
    }

    async findOneByCNPJ(cnpj: string) {
        if (!cnpj) return null;
        return await this.personRepository.findOneBy({ cnpj })
    }

    async findOneByCPF(cpf: string) {
        if (!cpf) return null;
        return await this.personRepository.findOneBy({ cpf })
    }
}