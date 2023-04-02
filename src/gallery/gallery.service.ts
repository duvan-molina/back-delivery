import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
  ) {}
  async saveUrlImage(imagenUrl: string, product: any) {
    const gallery = this.galleryRepository.create({
      imagenUrl,
      product,
    });

    await this.galleryRepository.save(gallery);

    return 'This action adds a new gallery';
  }
}
