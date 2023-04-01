import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @Field(() => [ID])
  productId: string[];

  @Field({ defaultValue: 'preparing' })
  stateRequested: string;

  @Field(() => Int, { nullable: true })
  quantity: number;
}
