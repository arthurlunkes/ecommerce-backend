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
import { Brand } from './brand.entity'
import { BrandService } from './brand.service'

@Controller('brands')
export class BrandController {
  constructor(private readonly service: BrandService) {}

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.service.findAll()
  }

  @Get('/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    return await this.service.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() category: Brand): Promise<Brand> {
    return await this.service.save(category)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: Brand,
  ): Promise<Brand> {
    return await this.service.update(id, category)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id)
  }
}
