import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context('user')
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
    },
  ) {
    return this.ordersService.create(createOrderInput, user.userId);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @ResolveField(() => User)
  getUser(@Parent() order: Order) {
    return this.ordersService.getUser(order.userId);
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.findOne(id);
  }
}
