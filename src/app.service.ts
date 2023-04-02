import { Injectable } from '@nestjs/common';
import { uploadImage } from './helpers/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { ProductsService } from './products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './gallery/entities/gallery.entity';
import { Repository } from 'typeorm';
import { GalleryService } from './gallery/gallery.service';

@Injectable()
export class AppService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly galleryService: GalleryService,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
  async uploadFiles(files: Array<Express.Multer.File>, productId: string) {
    const product = await this.productsService.findProductById(productId);

    const urls = [];
    for (const file of files) {
      const res = await uploadImage(file);
      // @ts-ignore
      await this.galleryService.saveUrlImage(res.secure_url, product);
      // @ts-ignore
      urls.push(res.secure_url);
    }
    return { urls };
  }
}
