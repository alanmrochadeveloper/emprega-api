import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, CategoryEnum } from './category.entity';

export class CreateCategoryDto {
    value: CategoryEnum;
}

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.categoryRepository.save(createCategoryDto);
    }

    async getByValue(value: CategoryEnum): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOneBy({ value })
            if (!category) throw new NotFoundException(`Essa categoria não foi encontrada ${value}`);
            return category;
        } catch (error: unknown) {
            let message = (error as { message: string })
            throw new BadRequestException(`Erro ao buscar o valor ${value} das categorias, ${message}`)
        }
    }
}

