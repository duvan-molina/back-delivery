import { Injectable } from '@nestjs/common';
import { uploadImage } from './helpers/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class AppService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
  async uploadFiles(files: Array<Express.Multer.File>) {
    const urls = [];
    for (const file of files) {
      const res = await uploadImage(file);
      // @ts-ignore
      urls.push(res.secure_url);
    }
    return { urls };
  }
}
