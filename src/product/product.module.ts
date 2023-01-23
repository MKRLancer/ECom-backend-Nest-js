import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from 'src/product-category/product-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductCategoryModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
