import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Configuração de conexão com o banco
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      // Auto carregar entidades
      autoLoadEntities: true,
      // Sincronizar com o banco, todas alterações são refletidas no banco
      // NÃO USAR EM PRODUÇÃO
      synchronize: true
    }),
    CategoryModule,
    BrandModule,
    ProductModule
  ],
})
export class AppModule {}
