import { Field, ObjectType } from '@nestjs/graphql';
import OrderedProductType from './orderedProduct.type';

@ObjectType()
export default class OrderTypes {
  @Field(() => String)
  stateRequested: string;

  @Field(() => [OrderedProductType])
  orderedProduct: OrderedProductType[];
}
