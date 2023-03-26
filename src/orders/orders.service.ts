import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  create(createOrderInput: CreateOrderInput) {
    const order = this.ordersRepository.create(createOrderInput);
    return this.ordersRepository.save(order);
  }

  findAll() {
    return `This action returns all orders`;
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
