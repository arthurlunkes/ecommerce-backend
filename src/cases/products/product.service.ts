import { DeleteResult, Repository } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['category'] })
  }

  async findById(id: string): Promise<Product> {
    const found = await this.repository.findOneBy({ id })
    if (!found)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
    else return found
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product)
  }

  async update(id: string, product: Product): Promise<Product> {
    await this.findById(id)

    product.id = id

    return this.repository.save(product)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
