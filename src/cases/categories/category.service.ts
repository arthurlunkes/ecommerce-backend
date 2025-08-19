import { DeleteResult, Repository } from 'typeorm'
import { Category } from './category.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repository.find()
  }

  async findById(id: string): Promise<Category> {
    const found = await this.repository.findOneBy({ id })
    if (!found)
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)
    else return found
  }

  save(category: Category): Promise<Category> {
    return this.repository.save(category)
  }

  async update(id: string, category: Category): Promise<Category> {
    await this.findById(id)

    category.id = id

    return this.repository.save(category)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
