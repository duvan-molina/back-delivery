import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  create(createProductInput: CreateProductInput) {
    const newPost = this.productsRepository.create(createProductInput);
    return this.productsRepository.save(newPost);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findProductById(productId: string): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
