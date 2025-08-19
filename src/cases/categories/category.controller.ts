import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.service.findAll()
  }

  @Get('/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return await this.service.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() category: Category): Promise<Category> {
    return await this.service.save(category)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return await this.service.update(id, category)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id)
  }
}
