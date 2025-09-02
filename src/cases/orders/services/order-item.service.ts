import { Repository } from 'typeorm'
import { OrderItem } from '../entity/order-item.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private repository: Repository<OrderItem>,
  ) {}

  findAll(): Promise<OrderItem[]> {
    return this.repository.find()
  }

  findById(id: string): Promise<OrderItem | null> {
    return this.repository.findOneBy({ id: id })
  }

  save(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem)
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
