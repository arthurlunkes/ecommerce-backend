import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entity/order.entity'
import { OrderItem } from './entity/order-item.entity'
import { OrderService } from './services/order.service'
import { OrderItemService } from './services/order-item.service'
import { OrderController } from './controllers/order.controller'
import { OrderItemController } from './controllers/order-item.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrderService, OrderItemService],
  controllers: [OrderController, OrderItemController],
})
export class OrderModule {}
