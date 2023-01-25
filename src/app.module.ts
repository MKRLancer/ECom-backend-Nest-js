import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { S3Service } from './common/s3/s3.service';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseConfig),
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule { }
