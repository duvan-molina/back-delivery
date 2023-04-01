import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @Field(() => [String])
  productIds: string[];

  @Field({ defaultValue: 'preparing' })
  stateRequested: string;

  @Field(() => Int, { nullable: true })
  quantity: number;
}
