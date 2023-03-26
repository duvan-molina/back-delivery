import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.ordersRepository.create(createOrderInput);

    let products: Product[] | [] = [];

    for (let i = 0; i < createOrderInput.productIds.length; i++) {
      const result = await this.productService.findProductById(
        createOrderInput.productIds[i],
      );
      products = [...products, result];
    }

    return this.ordersRepository.save({
      ...order,
      products,
    });
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['products'] });
  }

  getUser(userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  async findOne(orderId: string) {
    return await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
    });
  }
}
