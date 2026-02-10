import { Repository } from 'typeorm'
import { Order } from '../entity/order.entity'
import { OrderItem } from '../entity/order-item.entity'
import { Customer } from 'src/cases/customers/customer.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import {
  SalesByDateDto,
  TopCategoryDto,
  TopProductDto,
  OrderStatsDto,
  OrderItemDetailDto,
} from '../dtos/stats.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.repository.find()
  }

  findById(id: string): Promise<Order | null> {
    return this.repository.findOneBy({ id: id })
  }

  async save(order: any): Promise<Order> {
    // Se customer for uma string (nome), criar ou buscar o cliente
    if (typeof order.customer === 'string') {
      const customerName = order.customer.trim()
      if (customerName) {
        // Buscar cliente existente pelo nome
        let customer = await this.customerRepository.findOneBy({
          name: customerName,
        })

        // Se não existir, criar novo cliente
        if (!customer) {
          customer = await this.customerRepository.save({
            name: customerName,
          } as Customer)
        }

        order.customer = customer
      } else {
        order.customer = null
      }
    }

    return this.repository.save(order)
  }

  async remove(id: string): Promise<void> {
    // Primeiro deletar todos os order-items associados
    await this.orderItemRepository.delete({ order: { id } })

    // Depois deletar o pedido
    await this.repository.delete(id)
  }

  async getSalesByDate(): Promise<SalesByDateDto[]> {
    const orders = await this.repository.find({
      relations: ['items'],
    })

    const salesByDate = new Map<string, SalesByDateDto>()

    orders.forEach((order) => {
      const dateKey = new Date(order.createdAt).toISOString().split('T')[0]

      if (!salesByDate.has(dateKey)) {
        salesByDate.set(dateKey, {
          date: dateKey,
          orderCount: 0,
          totalValue: 0,
          averageOrderValue: 0,
        })
      }

      const stats = salesByDate.get(dateKey)!
      stats.orderCount += 1
      stats.totalValue += Number(order.total) || 0
    })

    // Calcular média
    salesByDate.forEach((stats) => {
      stats.averageOrderValue = stats.totalValue / stats.orderCount
    })

    return Array.from(salesByDate.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  }

  async getTopCategories(limit: number = 10): Promise<TopCategoryDto[]> {
    const orders = await this.repository.find({
      relations: ['items', 'items.product', 'items.product.category'],
    })

    const categoryMap = new Map<string, TopCategoryDto>()

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const category = item.product?.category
        if (category) {
          const key = category.id
          if (!categoryMap.has(key)) {
            categoryMap.set(key, {
              categoryId: category.id,
              categoryName: category.name,
              quantity: 0,
              totalValue: 0,
            })
          }

          const stats = categoryMap.get(key)!
          stats.quantity += item.quantity
          stats.totalValue += Number(item.value) * item.quantity || 0
        }
      })
    })

    return Array.from(categoryMap.values())
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, limit)
  }

  async getTopProducts(limit: number = 10): Promise<TopProductDto[]> {
    const orders = await this.repository.find({
      relations: ['items', 'items.product'],
    })

    const productMap = new Map<string, TopProductDto>()

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const product = item.product
        if (product) {
          const key = product.id
          if (!productMap.has(key)) {
            productMap.set(key, {
              productId: product.id,
              productName: product.name,
              quantity: 0,
              totalValue: 0,
            })
          }

          const stats = productMap.get(key)!
          stats.quantity += item.quantity
          stats.totalValue += Number(item.value) * item.quantity || 0
        }
      })
    })

    return Array.from(productMap.values())
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, limit)
  }

  async getOrderStats(): Promise<OrderStatsDto> {
    const orders = await this.repository.find()

    const totalOrders = orders.length
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0,
    )
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    const dates = orders
      .map((o) => new Date(o.createdAt).getTime())
      .filter((d) => !isNaN(d))

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      dateRange: {
        from: dates.length > 0 ? new Date(Math.min(...dates)) : new Date(),
        to: dates.length > 0 ? new Date(Math.max(...dates)) : new Date(),
      },
    }
  }

  async getAllOrderDetails(): Promise<OrderItemDetailDto[]> {
    const orders = await this.repository.find({
      relations: ['items', 'items.product', 'customer'],
    })

    const orderDetails: OrderItemDetailDto[] = []

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        if (item.product) {
          orderDetails.push({
            orderId: order.id,
            orderDate: order.createdAt.toISOString(),
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: Number(item.value) || 0,
            totalPrice: (Number(item.value) || 0) * item.quantity,
            customerName: order.customer?.name || 'Cliente não identificado',
            customerEmail: '',
            status: order.status || 'pending',
          })
        }
      })
    })

    return orderDetails.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    )
  }
}
