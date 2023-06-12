import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderedProduct } from './create-ordered-product.input';

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @Field(() => [CreateOrderedProduct])
  products: CreateOrderedProduct[];

  @Field({ defaultValue: 'preparing' })
  stateRequested: string;
}
