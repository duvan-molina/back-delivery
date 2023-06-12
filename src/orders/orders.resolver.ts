import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => [Order], {
    description: 'create orders',
  })
  @UseGuards(JwtGuard)
  async createOrder(
    @Args('createOrderInput', { type: () => [CreateOrderInput] })
    createOrderInput: CreateOrderInput[],
    @Context('user')
    user: {
      userId: string;
    },
  ): Promise<Order[]> {
    const response = await this.ordersService.createOrder(
      createOrderInput,
      user.userId,
    );
    return response;
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  // @ResolveField(() => User)
  // getUser(@Parent() order: Order) {
  //   return this.ordersService.getUser(order.userId);
  // }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.findOne(id);
  }
}
