import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderedProduct {
  @IsNotEmpty()
  @Field(() => ID)
  productId: string;

  @Field(() => Int, { nullable: true })
  quantity: number;
}
