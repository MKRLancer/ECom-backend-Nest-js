import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategory } from './entities/product-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory]), CommonModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategory],
  exports: [ProductCategory, TypeOrmModule]
})
export class ProductCategoryModule { }
