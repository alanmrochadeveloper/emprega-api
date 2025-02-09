import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService, CreateCategoryDto } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
}
