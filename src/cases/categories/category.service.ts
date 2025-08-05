import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
    ) {}

    findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Category | null> {
        return this.repository.findOneBy({ id: id });
    }
}