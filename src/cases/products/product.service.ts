import { Repository } from "typeorm";
import { Product } from "./producty.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private repository: Repository<Product>
    ) {}

    findAll(): Promise<Product[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Product | null> {
        return this.repository.findOneBy({ id: id });
    }

    save(Brand: Product): Promise<Product> {
        return this.repository.save(Brand);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}