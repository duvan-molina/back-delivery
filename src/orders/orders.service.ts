import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import { OrderedProduct } from './entities/orderedProduct.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderedProduct)
    private orderedProductRepository: Repository<OrderedProduct>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  async createOrder(
    createOrderInput: CreateOrderInput,
    userId: string,
  ): Promise<Order> {
    let orderedProductList: Array<OrderedProduct> = [];

    for (let i = 0; i < createOrderInput.products.length; i++) {
      const { productId, quantity } = createOrderInput.products[i];
      const product = await this.productService.findProductById(productId);

      const createOrderedProduct = this.orderedProductRepository.create({
        quantity,
        product,
      });

      const orderedProduct = await this.orderedProductRepository.save(
        createOrderedProduct,
      );

      orderedProductList = [...orderedProductList, orderedProduct];
    }

    const createOrder = this.ordersRepository.create({
      ...createOrderInput,
      userId,
      orderedProduct: orderedProductList,
    });

    const result = await this.ordersRepository.save(createOrder);

    return result;
  }

  async findAll() {
    const result = await this.ordersRepository.find({
      relations: ['orderedProduct', 'orderedProduct.product'],
    });
    return result;
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
