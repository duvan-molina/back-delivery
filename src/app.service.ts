import { Injectable } from '@nestjs/common';
import { uploadImage } from './helpers/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { GalleryService } from './gallery/gallery.service';

@Injectable()
export class AppService {
  constructor(private readonly galleryService: GalleryService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
  async uploadFiles(files: Array<Express.Multer.File>, productId: string) {
    const urls = [];
    for (const file of files) {
      const res = await uploadImage(file);
      await this.galleryService.saveUrlImage(res.secure_url, productId);
      urls.push(res.secure_url);
    }
    return { urls };
  }
}
