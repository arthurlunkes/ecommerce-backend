import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
        const category = await this.categoryService.findById(id);

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        };

        return category;
    }

    @Post()
    create(@Body() category: Category): Promise<Category> {
        return this.categoryService.save(category);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() categoryToUpdate: Category): Promise<Category> {
        const category = await this.categoryService.findById(id);

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        };

        categoryToUpdate.id = id;

        return this.categoryService.save(categoryToUpdate);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const category = await this.categoryService.findById(id);

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        };

        return this.categoryService.remove(id);
    }
}