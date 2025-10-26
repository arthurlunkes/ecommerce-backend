import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { Order } from '../entity/order.entity'
import { OrderService } from '../services/order.service'

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.service.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    const found = await this.service.findById(id)

    if (!found) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    }

    return found
  }

  @Post()
  create(@Body() order: Order): Promise<Order> {
    return this.service.save(order)
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() order: Order): Promise<Order> {
    const found = await this.service.findById(id)

    if (!found) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    }

    order.id = id

    return this.service.save(order)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id)

    if (!found) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    }

    return this.service.remove(id)
  }
}
