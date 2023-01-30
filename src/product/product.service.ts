import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/common/s3.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ImageDetails } from './types/ImageDeatails.type';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Injectable()
export class ProductService {
  constructor(
    private s3UploadService: S3Service,
    private productCategoryService: ProductCategoryService,
    @InjectRepository(Product)
    private productRepoistory: Repository<Product>,
  ) { }


  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<Product | any> {

    //check name constraint
    const isNameExists = await this.productRepoistory.findOne({
      where: {
        name: createProductDto.name
      }
    });

    if (isNameExists) {
      throw new BadRequestException('Product name already exists');
    }

    let imageUpload: ImageDetails = undefined;

    // upload image to s3
    if (image) {
      imageUpload = await this.s3UploadService.uploadToS3(
        image.buffer,
        image.originalname,
      );
    }
    const category = await this.productCategoryService.findOne(createProductDto.category);
    const productData = new Product();
    productData.name = createProductDto.name;
    productData.category = category;
    productData.price = createProductDto.price;
    productData.image = imageUpload;
    productData.quantity = createProductDto.quantity;
    productData.description = createProductDto.description;
    productData.slug = createProductDto.name.split(" ").join("-");
    productData.image = { ...imageUpload };
    return this.productRepoistory.save({ ...productData });
  }

  findAll() {
    return this.productRepoistory.find();
  }

  async findOne(id: number) {
    const product = await this.productRepoistory.findOne({
      where: {
        id
      },
    });
    if (!product) {
      throw new NotFoundException('Product does not found');
    }
    return product;
  }

  async updateImage(id: number, image: Express.Multer.File) {
    const product = await this.productRepoistory.findOne({
      where: {
        id
      }
    });
    if (!product) {
      throw new NotFoundException('Product does not found');
    }
    let imageUpload: ImageDetails = await this.s3UploadService.uploadToS3(
      image.buffer,
      image.originalname,
    );
    if (imageUpload) {
      //delete the old image
      this.s3UploadService.deleteS3Resource(product.image.key);
    }
    product.image = { ...imageUpload };
    return this.productRepoistory.save(product);
  }


  async update(id: number, updateProductDto: UpdateProductDto) {

    const product = await this.productRepoistory.findOne({
      where: {
        id
      },
    });

    if (!product) {
      throw new NotFoundException('Product does not found');
    }

    //TODO:Cleanup needed
    const { name, category } = updateProductDto;
    if (product.name != name) {
      const isExists = await this.productRepoistory.findOne({
        where: {
          name
        }
      });
      if (isExists) {
        throw new BadRequestException(
          `Product  with this name ${name} already exists`,
        );
      }
      else {
        product.slug = updateProductDto.name.split(" ").join("-");
      }
    }
    //ts-ignore
    if (product.category.id != category) {
      const category = await this.productCategoryService.findOne(updateProductDto.category);
      product.category = category;
    }
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.quantity = updateProductDto.quantity;
    product.description = updateProductDto.description;
    return this.productRepoistory.save(product);

  }

  async remove(id: number) {
    const product = await this.productRepoistory.findOne({
      where: {
        id
      }
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepoistory.remove(product);
  }
}
