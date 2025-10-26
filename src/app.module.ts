import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryModule } from './cases/categories/category.module'
import { BrandModule } from './cases/brands/brand.module'
import { ProductModule } from './cases/products/product.module'
import { CityModule } from './cases/cities/city.module'
import { OrderModule } from './cases/orders/order.module'

@Module({
  imports: [
    // Configuração de conexão com o banco
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      // Auto carregar entidades
      autoLoadEntities: true,
      // Sincronizar com o banco, todas alterações são refletidas no banco
      // NÃO USAR EM PRODUÇÃO
      synchronize: true,
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
    CityModule,
    OrderModule,
  ],
})
export class AppModule {}
