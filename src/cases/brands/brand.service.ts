import { DeleteResult, Repository } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from './brand.entity'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly repository: Repository<Brand>,
  ) {}

  findAll(): Promise<Brand[]> {
    return this.repository.find()
  }

  async findById(id: string): Promise<Brand> {
    const found = await this.repository.findOneBy({ id })
    if (!found)
      throw new HttpException('Marca não encontrada', HttpStatus.NOT_FOUND)
    else return found
  }

  save(brand: Brand): Promise<Brand> {
    return this.repository.save(brand)
  }

  async update(id: string, brand: Brand): Promise<Brand> {
    await this.findById(id)

    brand.id = id

    return this.repository.save(brand)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
