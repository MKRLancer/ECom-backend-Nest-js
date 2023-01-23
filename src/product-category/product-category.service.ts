import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) { }

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory | any> {
    const { name } = createProductCategoryDto;
    const isExists = await this.checkExists({ name });
    if (isExists) {
      throw new BadRequestException(
        `Product Category with this name ${createProductCategoryDto.name} already exists`,
      );
    }
    return this.productCategoryRepository.save(createProductCategoryDto);
  }

  findAll() {
    return this.productCategoryRepository.find({
      order: {
        created_at: 'desc'
      }
    });
  }

  async findOne(id: number): Promise<ProductCategory | any> {
    const isExists = await this.checkExists({ id });
    if (!isExists) {
      throw new NotFoundException('Product category not found');
    }
    return isExists;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const { name } = updateProductCategoryDto;
    const isExists = await this.checkExists({ name });
    if (isExists) {
      throw new BadRequestException(
        `Product Category with this name ${name} already exists`,
      );
    }
    const existingPCategory = await this.productCategoryRepository.preload({
      id: id,
      ...updateProductCategoryDto,
    });

    if (!existingPCategory) {
      throw new NotFoundException(`Product Category #${id} not found`);
    }
    return this.productCategoryRepository.save(existingPCategory);
  }

  async remove(id: number) {
    const PCategory = await this.checkExists({ id });
    if (!PCategory) {
      throw new NotFoundException(`Product Category #${id} not found`);
    }
    return this.productCategoryRepository.remove(PCategory);
  }

  async checkExists(searchObject: any) {
    return await this.productCategoryRepository.findOne({
      where: {
        ...searchObject,
      },
    });
  }
}
