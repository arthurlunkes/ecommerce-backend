export class SalesByDateDto {
  date: string
  orderCount: number
  totalValue: number
  averageOrderValue: number
}

export class TopCategoryDto {
  categoryId: string
  categoryName: string
  quantity: number
  totalValue: number
}

export class TopProductDto {
  productId: string
  productName: string
  quantity: number
  totalValue: number
}

export class OrderStatsDto {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  dateRange: {
    from: Date
    to: Date
  }
}

export class OrderItemDetailDto {
  orderId: string
  orderDate: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  customerName: string
  customerEmail: string
  status: string
}
