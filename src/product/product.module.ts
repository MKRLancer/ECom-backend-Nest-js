import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { CommonModule } from 'src/common/common.module';
import { S3Service } from 'src/common/s3.service';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductCategoryModule, CommonModule],
  controllers: [ProductController],
  providers: [ProductService, S3Service, ProductCategoryService]
})
export class ProductModule { }
