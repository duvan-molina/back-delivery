import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './entities/product.entity';

@ObjectType()
export default class ProductsConnection {
  @Field(() => [Product])
  items: Product[];

  @Field(() => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}
