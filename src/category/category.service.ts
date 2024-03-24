import { Injectable } from '@nestjs/common';
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
        return await this.categoryRepository.findOneBy({ value })
    }
}

