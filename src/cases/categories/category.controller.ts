import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
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
    findById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    save(category: Category): Promise<Category> {
        return this.categoryService.save(category);
    }

    remove(id: string): Promise<void> {
        return this.categoryService.remove(id);
    }
}