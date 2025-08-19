import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Brand } from "./brand.entity";
import { BrandService } from "./brand.service";

@Controller('brands')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) {}

    @Get()
    findAll(): Promise<Brand[]> {
        return this.brandService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
        const brand = await this.brandService.findById(id);

        if (!brand) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        };

        return brand;
    }

    @Post()
    create(@Body() brand: Brand): Promise<Brand> {
        return this.brandService.save(brand);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() brandToUpdate: Brand): Promise<Brand> {
        const brand = await this.brandService.findById(id);

        if (!brand) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        };

        brandToUpdate.id = id;

        return this.brandService.save(brandToUpdate);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const brand = await this.brandService.findById(id);

        if (!brand) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        };

        return this.brandService.remove(id);
    }
}