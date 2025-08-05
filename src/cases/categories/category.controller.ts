import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController {

    constructor(private readonly service: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.service.findAll()
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<Category> {
        const found = await this.service.findById(id);

        if (!found) throw new HttpException('Categoria não encontrado', HttpStatus.NOT_FOUND)
            
        return found;
    }
}