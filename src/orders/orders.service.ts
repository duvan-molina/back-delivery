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

  async createOrder(
    createOrderInput: CreateOrderInput[],
    userId: string,
  ): Promise<Order[]> {
    let orders: Order[] | [] = [];

    for (let i = 0; i < createOrderInput.length; i++) {
      let products: Product[] | [] = [];

      for (let j = 0; j < createOrderInput[i].productId.length; j++) {
        const product = await this.productService.findProductById(
          createOrderInput[i].productId[j],
        );

        products = [...products, product];
      }

      const createOrder = this.ordersRepository.create({
        ...createOrderInput[i],
        userId,
        products,
      });

      const response = await this.ordersRepository.save(createOrder);
      orders = [...orders, response];
    }

    return orders;
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
