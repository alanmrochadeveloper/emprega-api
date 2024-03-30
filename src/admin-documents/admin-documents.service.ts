import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEnum } from 'src/category/category.entity';
import { PersonService } from 'src/person/person.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AdminDocuments } from './admin-documents.entity';

@Injectable()
export class AdminDocumentsService {
    constructor(
        @InjectRepository(AdminDocuments)
        private adminDocumentsRepository: Repository<AdminDocuments>,
        private readonly personService: PersonService,
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) { }

    async getAll() {
        return await this.adminDocumentsRepository.find()
    }

    async findOneByValue(value: string) {
        return await this.adminDocumentsRepository.findOne({ where: { value } })
    }

    async addDocument(document: AdminDocuments, user: User): Promise<AdminDocuments | void> {
        const userWithPerson = await this.userService.findOneByIdWithRelations(user.id, ['person'])
        const personWithCategory = await this.personService.findOneByIdWithRelations(userWithPerson.person.id, ['category'])
        if (personWithCategory.category.value === CategoryEnum.Admin) {
            return await this.adminDocumentsRepository.save(document)
        }
        throw new UnauthorizedException("Não autorizado para essa ação")
    }

}
