import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api/v1/upload-images')
  @UseInterceptors(FilesInterceptor('files'))
  createApartament(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.appService.uploadFiles(files);
  }
}
