import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Product } from "./producty.entity";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        const brand = await this.productService.findById(id);

        if (!brand) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        };

        return brand;
    }

    @Post()
    create(@Body() brand: Product): Promise<Product> {
        return this.productService.save(brand);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() productToUpdate: Product): Promise<Product> {
        const brand = await this.productService.findById(id);

        if (!brand) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        };

        productToUpdate.id = id;

        return this.productService.save(productToUpdate);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const product = await this.productService.findById(id);

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        };

        return this.productService.remove(id);
    }
}