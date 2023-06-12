import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export default class OrderedProductType {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Product)
  product: Product;
}
