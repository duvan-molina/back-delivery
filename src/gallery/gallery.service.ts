import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
    private readonly productsService: ProductsService,
  ) {}

  async saveUrlImage(imagenUrl: string, productId: any) {
    const product = await this.productsService.findProductById(productId);

    if (product) {
      const gallery = this.galleryRepository.create({
        imagenUrl,
        product,
      });

      await this.galleryRepository.save(gallery);
    }

    return 'This action adds a new gallery';
  }
}
