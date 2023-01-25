import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { S3Service } from './common/s3/s3.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly uploadService: S3Service) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadToS3(
      file.buffer,
      file.originalname,
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
