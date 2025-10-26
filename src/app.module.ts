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
      host: 'aws-0-sa-east-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.nmxomntywnwtroavsxne',
      password: 'postgres',
      database: 'postgres',
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
