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
}